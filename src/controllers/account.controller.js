const accountModel = require("../models/account.model");
const ledgerModel = require("../models/ledger.model");
const mongoose = require('mongoose');

async function createAccountController(req,res) {

    const user= req.user;

    const account = await accountModel.create({
        user : user._id
    });

    return res.status(201).json({
        account
    });
}

async function depositController(req,res) {
    try {
        const {accountId, amount} = req.body;

        if(!accountId || !amount || amount <= 0) {
            return res.status(400).json({
                message : "accountId and a valid amount are required "
            });
        }

        const account = await accountModel.findOne({_id:accountId,user:req.user._id});

        if(!account) {
            return res.status(404).json({
                message : "account not found"
            });
        }

        if(account.status !== "ACTIVE") {
            return res.status(400).json({message : "Account must be ACTIVE to deposit"});
        }

        await ledgerModel.create({
            account: accountId,
            amount : amount,
            transaction: new mongoose.Types.ObjectId(),
            type : "CREDIT"
        });

        const newBalance = await account.getBalance();

        return res.status(201).json({
            message : "Deposit successful",
            balance : newBalance
        })
    }
    catch(error) {
        console.log(error);
    }
}

module.exports =  {
    createAccountController,
    depositController
}