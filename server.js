require('dotenv').config();
const dns = require('dns');
dns.setServers(['8.8.8.8'],['8.8.4.4']);

const app = require('./src/app');
const connectDB = require('./src/config/db');
const port = process.env.PORT;

connectDB().then(()=> {
    app.listen(port,()=>{
    console.log(`Server is running on port ${port}`);
});
})
