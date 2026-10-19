const express=require('express');
const {User}=require('../models/user');
const { validation } = require('../utils/validation');
const bcrypt=require('bcrypt');
const { userAuth } = require('../middlewares/auth');
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
        const {firstName,lastName,skills,_id}=user;
        res.cookie("token",token);
        res.status(201).json({_id,firstName,lastName,skills});
    }
    catch(err){
        res.status(401).json({message:err.message});
    }
});
authRouter.post('/logout',async(req,res)=>{
    try{
        res.clearCookie("token",{
            path:'/'
        });
        res.status(200).send({message:"Sucessfully logged out"});
    }
    catch(err){
        res.status(400).send({message:"Error during logout"});
    }
})
module.exports={authRouter};    