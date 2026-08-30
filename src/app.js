const express=require('express');
const jwt=require('jsonwebtoken');
const cookieParser=require('cookie-parser');
const {connectDb}=require('./config/database');
const app=express();
connectDb().then(()=>{
    console.log('connect to db');
    app.listen(5470,()=>{
        console.log("Logging to Server");
    })
}).catch((err)=>{
    console.log(err.message);
    process.exit(1);
});
app.use(express.json());
app.use(cookieParser());
const authRouter=require('./routes/auth');
const requestRouter=require('./routes/request');
const profileRouter=require('./routes/profile');


