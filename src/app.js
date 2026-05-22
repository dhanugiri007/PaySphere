const express = require('express');
const path = require('path');
const cookie = require('cookie-parser');
const authRouter = require('./routes/auth.route');
const accountRouter = require('./routes/account.route');
const transactionRouter = require('./routes/transaction.route');

const app = express();

app.use(express.json());
app.use(cookie());
app.use(express.urlencoded({ extended: true }));

app.use(express.static(path.join(__dirname, '../public')));



app.use("/api/auth",authRouter);
app.use("/api/account",accountRouter);
app.use("/api/transaction",transactionRouter);

module.exports = app;