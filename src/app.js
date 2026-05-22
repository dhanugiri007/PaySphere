const express = require('express');
const cookie = require('cookie-parser');
const authRouter = require('./routes/auth.route');
const accountRouter = require('./routes/account.route');
const transactionRouter = require('./routes/transaction.route');

const app = express();

app.use(express.json());
app.use(cookie());

app.get("/", (req, res) => {
    res.send("Paysphere is running");
});

app.use("/api/auth",authRouter);
app.use("/api/account",accountRouter);
app.use("/api/transaction",transactionRouter);

module.exports = app;