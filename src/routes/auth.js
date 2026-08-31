const express=require('express');
const {User}=require('../models/user');
const {validation}=require('../utils/validation');
const bcrypt=require('bcrypt');
const authRouter=express.Router();
authRouter.post('/signup',async (req,res)=>{
    try{
        const {firstName,lastName,emailId,password}=req.body;
        validation(firstName,lastName,emailId,password);
        const hashedpassword=await bcrypt.hash(password,10);
        const user=new User({firstName,lastName,emailId,password:hashedpassword});
        await user.save();
        res.status(201).send('new user signed up');
    }
    catch(err){
        res.status(201).send('Invalid Credentials');
    } 
});
authRouter.post('/login',async(req,res)=>{
    try{
        const {emailId,password}=req.body;
        const user= await User.findOne({emailId});
        const valid=user.verifyPassword(password);
        if(!valid){
            throw new Error('Invalid Credentials');
        }
        const token=user.getJWT();
        res.cookie("token",token);
        res.status(201).send('User Logged In');
    }
    catch(err){
        res.status(401).send('ERROR'+err.message);
    }
});
authRouter.post('/logout',async(req,res)=>{
    res.clearCookie("token");
    res.send("Loqout Successful");
});
module.exports={authRouter};