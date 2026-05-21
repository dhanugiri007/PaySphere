require('dotenv').config();
const dns = require('dns');
dns.setServers(['8.8.8.8'],['8.8.4.4']);

const app = require('./src/app');
const connectDB = require('./src/config/db');

app.listen(3000,()=>{
    console.log("server is running on port");
});