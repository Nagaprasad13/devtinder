const express=require('express');
const {connectDb}=require('./config/database');
const cookiePaser=require('cookie-parser');
const { authRouter } = require('./routes/auth');
const {profileRouter}=require('./routes/profile');
const {requestRouter}=require('./routes/request');
const {userRouter}=require('./routes/user');
const app=express();
connectDb().then(()=>{
    app.listen(5470);
    console.log("connected to db");
}).catch((err)=>{
    console.log(err);
});
app.use(express.json());
app.use(cookiePaser());
app.use('/',authRouter);
app.use('/',profileRouter);
app.use('/',requestRouter);
app.use('/',userRouter);