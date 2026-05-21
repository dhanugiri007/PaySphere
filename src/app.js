const express = require('express');
const cookie = require('cookie-parser');
const authRouter = require('./routes/auth.route');
const accountRouter = require('./routes/account.route');

const app = express();

app.use(express.json());
app.use(cookie());

app.use("/api/auth",authRouter);
app.use("/api/account",accountRouter);

module.exports = app;