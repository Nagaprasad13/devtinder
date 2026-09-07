const express=require('express');
const {User}=require('../models/user');
const profileRouter=express.Router();
const {userAuth}=require("../middlewares/auth");
profileRouter.get('/profile',userAuth,async(req,res)=>{
    try{
        res.status(201).json(req.user);
    }
    catch(err){
        res.status(401).send('Unable to get the user data');
    }
});
profileRouter.patch('/profile/edit',userAuth,async(req,res)=>{
    try{
        const allowedfields=["firstName","lastName"];
        const updates={};
        for(let field of allowedfields){
            if(req.body[field]!==undefined){
                updates[field]=req.body[field]
            }
        }
        if(Object.keys(updates).length===0){
            throw new Error('Allowed fields can be changed');
        }
        const userId=req.user._id;
        const updated=await User.findByIdAndUpdate(userId,updates,{returnDocument:"after"});
        if(!updated){
            throw new Error('User not found');
        }
        res.status(200).send({message:"User Updated",updated})
;    }
    catch(err){
        res.status(401).send("error"+err.message);
    }
});
module.exports={profileRouter};