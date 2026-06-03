const express = require('express');
const swaggerUi = require("swagger-ui-express");
const swaggerSpec = require("./services/swagger");
const cookie = require('cookie-parser');
const authRouter = require('./routes/auth.route');
const accountRouter = require('./routes/account.route');
const transactionRouter = require('./routes/transaction.route');

const app = express();

app.use(express.json());
app.use(cookie());
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));



app.use("/api/auth",authRouter);
app.use("/api/account",accountRouter);
app.use("/api/transaction",transactionRouter);

module.exports = app;