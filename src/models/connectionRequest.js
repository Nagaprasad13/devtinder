const mongoose=require('mongoose');
const connectionRequestSchema=mongoose.Schema({
    fromUserId:{
        type:mongoose.Schema.Types.ObjectId,
        required:true
    },
    toUserId:{
        type:mongoose.Schema.Types.ObjectId,
        required:true,
    },
    status:{
        type:String,
        required:true,
        enum:{
            values:["accepted","rejected","ignored","interested"],
            message:"{VALUE} is not correct"
        }
    }
},{timestamps:true});
connectionRequestSchema.pre('save',function(next){
    if(this.fromUserId.equals(this.toUserId)){
        throw new Error("connection is invalid");
    }
});
connectionRequestSchema.index({
   fromUserId:1,toUserId:1
})
connectionRequestSchema.index({
    toUserId:1,fromUserId:1
});
const requestConnectionModel=mongoose.model("connectionrequests",connectionRequestSchema);
module.exports={requestConnectionModel};