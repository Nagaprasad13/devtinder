const express=require('express');
const {requestConnectionModel}=require('../models/connectionRequest');
const userRouter=express.Router();
const {userAuth}=require('../middlewares/auth');
userRouter.get('/user/connection',userAuth,async(req,res)=>{
    try{
        const user=req.user;
        const connections=await requestConnectionModel.find({
            $or:[{fromUserId:user._id},{toUserId:user._id}],
            status:"accepted"
        });
        if(connections.length===0){
            throw new Error('no connection Exists');
        }
        res.status(200).json({message:"fetched connections",connections});
    }
    catch(err){
        res.status(401).send(err.message);
    }
});
userRouter.get('/user/request',userAuth,async(req,res)=>{
    try{
        const user=req.user;
        const requests=await requestConnectionModel.find({toUserId:user._id,status:"interested"});
        if(requests.length===0){
            throw new Error('No request Available');
        }
        res.status(200).json({message:"fetched connections",requests});
    }
    catch(err){
        res.status(401).send('ERROR:'+err.message);
    }
})
module.exports={userRouter};