const router = require('express');
const authMiddleware = require('../middlewares/auth.middleware');
const transactionController = require("../controllers/transaction.controller");

const transactionRoutes = router();

transactionRoutes.post("/",authMiddleware.authMiddleware,transactionController.createTransaction);


module.exports = transactionRoutes;