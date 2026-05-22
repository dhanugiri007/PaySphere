const express = require("express");
const authMiddleware = require("../middlewares/auth.middleware");
const accountController = require("../controllers/account.controller");
const router = express.Router();


router.post("/create-account",authMiddleware.authMiddleware, accountController.createAccountController);
router.post("/deposit",authMiddleware.authMiddleware,accountController.depositController);
router.get("/balance", authMiddleware.authMiddleware, accountController.getBalanceController);
router.get("/transactions", authMiddleware.authMiddleware, accountController.getTransactionHistoryController);

module.exports = router;