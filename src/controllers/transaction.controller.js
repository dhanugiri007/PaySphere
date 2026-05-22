const transactionModel = require("../models/transaction.model");
const ledgerModel = require("../models/ledger.model");
const accountModel = require("../models/account.model");
const emailService = require("../services/email.service");
const mongoose = require('mongoose');


async function createTransaction(req,res) {

    try {

    
    const {fromAccount,toAccount,amount,idempotencyKey} = req.body

    if(!fromAccount || !toAccount || !amount || !idempotencyKey) {
       return res.status(400).json({
        message : "fromAccount, toAccount, amount and idempotencyKey"
        });
    }

    const fromUserAccount = await accountModel.findOne({
        _id: fromAccount
    });

    const toUserAccount = await accountModel.findOne({
        _id: toAccount
    })
    if(!fromUserAccount || !toUserAccount) {
        return res.status(400).json({
            message: "Invalid fromAccount or to Account"
        });
    }

    const isTransactionAlreadyExists = await transactionModel.findOne({
        idempotencyKey: idempotencyKey
    });

    if(isTransactionAlreadyExists) {
        if(isTransactionAlreadyExists.status === "COMPLETED") {
           return res.status(200).json({
                message : "Transaction already processed",
                transaction: isTransactionAlreadyExists
            
            });
        }
        if(isTransactionAlreadyExists.status === "PENDING") {
          return  res.status(200).json({
                message : "Transaction is still processing",
                transaction : isTransactionAlreadyExists,
            })
        }
        if(isTransactionAlreadyExists.status === "FAILED") {
           return res.status(500).json({
                message : "Transaction failed",
                transaction : isTransactionAlreadyExists
            })
        }

        if(isTransactionAlreadyExists.status==="REVERSED") {
            return res.status(500).json({
                message : "Transaction was reversed",
                transaction : isTransactionAlreadyExists
            })
        }
    }

    if(fromUserAccount.status !== "ACTIVE" || toUserAccount.status !== "ACTIVE") {
        return res.status(400).json({
            message : "Both from Account and toAccount must be ACTIVE to process transaction"
        });
    }

    const balance = await fromUserAccount.getBalance();

    if(balance < amount) {
        return res.status(400).json({
            message: `Insufficient balance. Current balance is ${balance}. Requested amount is ${amount}`
        })
    }

    const session = await mongoose.startSession();
    session.startTransaction();

    const transaction = await transactionModel.create([{
    fromAccount,
    toAccount,
    amount,
    idempotencyKey,
    status: "PENDING"
}], {session});

    const creditledgerEntry = await ledgerModel.create([{
    account: toAccount,
    amount: amount,
    transaction: transaction[0]._id,
    type: "CREDIT"
}], {session});

    const debitledgerEntry = await ledgerModel.create([{
    account: fromAccount,
    amount: amount,
    transaction: transaction[0]._id,
    type: "DEBIT"
}], {session});

    transaction[0].status = "COMPLETED";
    await transaction[0].save({session});

    await session.commitTransaction();
    session.endSession();

    await emailService.sendTransactionEmail(req.user.email, req.user.name, amount, toAccount)

    return res.status(201).json({
        message: "Transaction completed successfully",
        transaction: transaction
    });
} catch(error) {
    console.log(error);
}
}


module.exports = {createTransaction};