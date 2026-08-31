const {User}=require('../models/user');
const express=require('express');
const { userAuth } = require('../middlewares/auth');
const profileRouter=express.Router();
profileRouter.get('/profile',userAuth,(req,res)=>{
    const user=req.user;
    console.log('connection to user');
    res.status(201).send(user);
});
profileRouter.patch("/profile",userAuth,async (req,res)=>
{
    try{      
        const updatedUser=await User.findByIdAndUpdate(req.user._id,req.body,{ returnDocument: "after" });//instead if new use return document 
        res.status(201).send(updatedUser);
    }
    catch(err){
        res.status(401).send('falied to update '+err.message);
    }
});
module.exports={profileRouter};