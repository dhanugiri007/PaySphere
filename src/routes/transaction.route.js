const express = require('express');
const authMiddleware = require('../middlewares/auth.middleware');
const transactionController = require("../controllers/transaction.controller");

const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: Transaction
 *   description: Peer-to-peer money transfers
 */

/**
 * @swagger
 * /api/transaction:
 *   post:
 *     summary: Transfer funds between two accounts
 *     tags: [Transaction]
 *     security:
 *       - cookieAuth: []
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - fromAccount
 *               - toAccount
 *               - amount
 *               - idempotencyKey
 *             properties:
 *               fromAccount:
 *                 type: string
 *                 description: Account ID of the sender
 *                 example: 664e1f9a2f8b4c0012a3d789
 *               toAccount:
 *                 type: string
 *                 description: Account ID of the recipient
 *                 example: 664e1f9a2f8b4c0012a3d012
 *               amount:
 *                 type: number
 *                 description: Amount to transfer (must not exceed sender's balance)
 *                 example: 2000
 *               idempotencyKey:
 *                 type: string
 *                 description: Unique key to prevent duplicate transactions
 *                 example: txn-unique-key-abc123
 *     responses:
 *       201:
 *         description: Transaction completed successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Transaction completed successfully
 *                 transaction:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       _id:
 *                         type: string
 *                         example: 664e1f9a2f8b4c0012a3d999
 *                       fromAccount:
 *                         type: string
 *                         example: 664e1f9a2f8b4c0012a3d789
 *                       toAccount:
 *                         type: string
 *                         example: 664e1f9a2f8b4c0012a3d012
 *                       amount:
 *                         type: number
 *                         example: 2000
 *                       status:
 *                         type: string
 *                         example: COMPLETED
 *                       idempotencyKey:
 *                         type: string
 *                         example: txn-unique-key-abc123
 *       200:
 *         description: Duplicate idempotency key — returns existing transaction
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Transaction already processed
 *                 transaction:
 *                   type: object
 *       400:
 *         description: Missing fields, invalid accounts, inactive accounts, or insufficient balance
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Insufficient balance. Current balance is 1000. Requested amount is 2000"
 *       401:
 *         description: Unauthorized - token missing or invalid
 *       500:
 *         description: Transaction failed or was reversed
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Transaction failed
 *                 transaction:
 *                   type: object
 */
router.post("/", authMiddleware.authMiddleware, transactionController.createTransaction);

module.exports = router;