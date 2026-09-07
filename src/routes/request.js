    const express=require('express');
    const {requestConnectionModel}=require('../models/connectionRequest');
    const { userAuth } = require('../middlewares/auth');
    const {validation}=require('../utils/requestValidation');
    const {reviewValidation}=require('../utils/reviewValidation');
    const {User}=require('../models/user');
    const requestRouter=express.Router();
    requestRouter.post('/request/send/:status/:toUserId',userAuth,async(req,res)=>{
        try{
            const status=req.params.status;
            const toUserId=req.params.toUserId;
            validation(status);
            const fromUserId=req.user._id;
            const to=await User.findById(toUserId);
            if(!to){
                throw new Error('Connection doesnot exists');
            }
            const exist = await requestConnectionModel.find({
        $or: [
            { fromUserId, toUserId },
            { fromUserId: toUserId, toUserId: fromUserId }
        ],
        $or:[{status:"interested"},{status:"accepted"}]
    });
            if(exist){
                throw new Error('Connection already exists');
            }
            const connection=new requestConnectionModel({fromUserId,toUserId,status});
            await connection.save();
            res.status(201).send(req.user.firstName+" sending connection to "+to.firstName);
        }
        catch(err){
            res.status(401).send(err.message);
        }
    });
    requestRouter.post('/request/review/:status/:fromUserId',userAuth,async(req,res)=>{
        try{
            const toUserId=req.user._id;
            const status=req.params.status;
            reviewValidation(status);
            const fromUserId=req.params.fromUserId;
            const exists=await requestConnectionModel.findOne({fromUserId:fromUserId,toUserId:toUserId,status:"interested"});
            if(!exists){
                throw new Error('Connection doesnot exists');
            }
            exists.status=status;
            await exists.save();
            res.status(200).send(`Request ${status} successfully`);
        }
        catch(err){
            res.status(401).send(err.message);
        }
    });
module.exports={requestRouter};