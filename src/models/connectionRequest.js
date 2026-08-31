    const express=require('express');
    const mongoose=require('mongoose');
    const connectionRequestSchema=new mongoose.Schema({
        fromUserId:{
            type:mongoose.Schema.Types.ObjectId,
            required:true,
            ref:"User"
        },
        toUserId:{
            type:mongoose.Schema.Types.ObjectId,
            required:true,
            ref:"User"
        },
        status:{
            type:String,
            enum:{
                values:["ignored","accepted","rejected","interested"],
                message:'{VALUE} is a incorrect Status Type'
            },
            required:true
        }

    },{
        timestamps:true
    });
    const connectionRequestModel=mongoose.model("connectionRequests",connectionRequestSchema);
    module.exports={connectionRequestModel};