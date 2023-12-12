const connectDB= require('./db/db')
const app=require('./server/express')
const port = 5000;
require('dotenv').config()

// const express = require('express');
// const app = express();

// app.get('/vercel', (req, res) => {
//   res.send('Hello from Express on Vercel!');
// });

const start = async () => {
       try {
        await connectDB(process.env.MONGO_URI);
        app.listen(port || process.env.PORT,() => {
            console.log(`Server is running on port ${port}`);
        });
    } catch (error) {
        console.log(error);
    }
}

start();
