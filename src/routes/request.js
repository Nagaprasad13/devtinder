const express=require('express');
const requestRouter=express.Router();
const {userAuth}=require('../middlewares/auth');
const {statusValidation}=require('../utils/userInterest');
const {User}=require('../models/user');
const {connectionRequestModel}=require('../models/connectionRequest');
requestRouter.post('/request/send/:status/:toUserId',userAuth,async(req,res)=>{
    try{
    const {status,toUserId}=req.params;
    statusValidation(status);

    const fromUserId=req.user._id;  
    const isUser=await User.findById(toUserId);
    if(!isUser){
        throw new Error('Request user is not there')
    };
    const connectionRequest=new connectionRequestModel({fromUserId:fromUserId,toUserId:toUserId,status:status});
    await connectionRequest.save();
    res.status(201).send(req.user.firstName+"is sending connection to "+isUser.firstName);
    }
    catch(err){
        res.status(401).send('Invalid Connection'+err.message);
    }
});
requestRouter.post('/request/review/:status/:fromUserId',userAuth,async(req,res)=>{
    try{
        const {status,fromUserId}=req.params;
        statusValidation(status);
        const connectionRequest=await connectionRequestModel.findOne({fromUserId:fromUserId,toUserId:req.user._id,status:"interested"});
        if(!connectionRequest){
            throw new Error('connection Request not Found');
        }
        connectionRequest.status=status;
        await connectionRequest.save();
        res.status(201).send(`Request ${status} successfully`);
    }
    catch(err){
        res.status(401).send('Something went Wrong');
    }
})
module.exports={requestRouter};
