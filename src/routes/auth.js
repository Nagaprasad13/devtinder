const express=require('express');
const authRouter=express.Router();
const {User}=require('../models/user');
const {validation}=require('../utils/validation')
authRouter.post('/signup',async (req,res)=>{
    try{
        const {firstName,lastName,emailId,password}=req.body;
        validation(firstName,lastName,emailId,password);
        const hashedPass=await bcrypt.hash(password,10);
        const user=new User({firstName,lastName,emailId,password:hashedPass});
        await user.save();
        res.status(201).send("New User Signed Up");
    }
    catch(err){
         res.status(404).send("ERROR"+err.message);
    }
});
authRouter.post('/login',async(req,res)=>{
    try{
        const {emailId,password}=req.body;
        const user=await User.findOne({emailId});
        const valid=user.verifyPassword(password);
        if(!valid){
            throw new Error('Invaild Credentials');
        }
        const token=user.getJWT();
        res.cookie("token",token);
        res.status(201).send("User Logged In");
    }
    catch(err){
        res.status(404).send("ERROR"+err.message);
    }
});
module.exports={authRouter};