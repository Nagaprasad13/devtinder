const express=require('express');
const {User}=require('../models/user');
const { validation } = require('../utils/validation');
const bcrypt=require('bcrypt');
const authRouter=express.Router();
authRouter.post('/signup',async(req,res)=>{
    try{
        const {firstName,lastName,emailId,password}=req.body;
        validation(firstName,lastName,emailId,password);
        const exists=await User.findOne({emailId});
        if(exists){
            throw new Error('User is already signed up');
        }
        const hashedpass=await bcrypt.hash(password,10);
        const user=new User({firstName,lastName,emailId,password:hashedpass});
        await user.save();
        res.status(201).send('new user created');
    }
    catch(err){
        res.status(401).json({message:err.message});
    }
});
authRouter.post('/login',async(req,res)=>{
    try{
        const {emailId,password}=req.body;
        const user=await User.findOne({emailId});
        if(!user){
            throw new Error('NO user exists');
        }
        const verify=await user.verifypass(password);
        if(!verify){
            throw new Error('Invalid Credentials');
        }
        const token=user.getJWT();
        res.cookie("token",token);
        res.status(201).send('User Logged IN');
    }
    catch(err){
        res.status(401).json({message:err.message});
    }
});
module.exports={authRouter};