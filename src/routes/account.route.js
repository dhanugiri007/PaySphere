const express = require("express");
const authMiddleware = require("../middlewares/auth.middleware");
const accountController = require("../controllers/account.controller");
const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: Account
 *   description: Bank account management
 */

/**
 * @swagger
 * /api/account/create-account:
 *   post:
 *     summary: Create a new bank account for the logged-in user
 *     tags: [Account]
 *     security:
 *       - cookieAuth: []
 *       - bearerAuth: []
 *     responses:
 *       201:
 *         description: Account created successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 account:
 *                   type: object
 *                   properties:
 *                     _id:
 *                       type: string
 *                       example: 664e1f9a2f8b4c0012a3d789
 *                     user:
 *                       type: string
 *                       example: 664e1f9a2f8b4c0012a3d456
 *                     status:
 *                       type: string
 *                       enum: [ACTIVE, FROZEN, CLOSED]
 *                       example: ACTIVE
 *                     currency:
 *                       type: string
 *                       example: INR
 *                     createdAt:
 *                       type: string
 *                       format: date-time
 *                     updatedAt:
 *                       type: string
 *                       format: date-time
 *       401:
 *         description: Unauthorized - token missing or invalid
 */
router.post("/create-account", authMiddleware.authMiddleware, accountController.createAccountController);

/**
 * @swagger
 * /api/account/deposit:
 *   post:
 *     summary: Deposit funds into the logged-in user's account
 *     tags: [Account]
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
 *               - accountId
 *               - amount
 *             properties:
 *               accountId:
 *                 type: string
 *                 description: ID of the account to deposit into
 *                 example: 664e1f9a2f8b4c0012a3d789
 *               amount:
 *                 type: number
 *                 description: Amount to deposit (must be greater than 0)
 *                 example: 5000
 *     responses:
 *       201:
 *         description: Deposit successful
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Deposit successful
 *                 balance:
 *                   type: number
 *                   example: 5000
 *       400:
 *         description: Missing/invalid fields or account is not ACTIVE
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: accountId and a valid amount are required
 *       404:
 *         description: Account not found
 *       401:
 *         description: Unauthorized - token missing or invalid
 */
router.post("/deposit", authMiddleware.authMiddleware, accountController.depositController);

/**
 * @swagger
 * /api/account/balance:
 *   get:
 *     summary: Get the balance of the logged-in user's account
 *     tags: [Account]
 *     security:
 *       - cookieAuth: []
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Balance fetched successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 balance:
 *                   type: number
 *                   example: 15000
 *                 currency:
 *                   type: string
 *                   example: INR
 *       404:
 *         description: Account not found
 *       401:
 *         description: Unauthorized - token missing or invalid
 *       500:
 *         description: Internal server error
 */
router.get("/balance", authMiddleware.authMiddleware, accountController.getBalanceController);

/**
 * @swagger
 * /api/account/transactions:
 *   get:
 *     summary: Get the full transaction history for the logged-in user's account
 *     tags: [Account]
 *     security:
 *       - cookieAuth: []
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Transaction history fetched successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 transactions:
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
 *                         enum: [PENDING, COMPLETED, FAILED, REVERSED]
 *                         example: COMPLETED
 *                       idempotencyKey:
 *                         type: string
 *                         example: txn-unique-key-abc123
 *                       createdAt:
 *                         type: string
 *                         format: date-time
 *       404:
 *         description: Account not found
 *       401:
 *         description: Unauthorized - token missing or invalid
 *       500:
 *         description: Internal server error
 */
router.get("/transactions", authMiddleware.authMiddleware, accountController.getTransactionHistoryController);

module.exports = router;