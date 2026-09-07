const {User}=require('../models/user');
const jwt=require('jsonwebtoken');
const userAuth=async(req,res,next)=>{
    try{
        const token=req.cookies.token;
        if(!token){
            throw new Error('Please Login');
        }
        const decoded=jwt.verify(token,"devTinder@1303");
        const userId=decoded.userId;
        const user=await User.findById(userId);
        if(!user){
            throw new Error('No User like this exists');
        }
        req.user=user;
        next();
    }
    catch(err){
        res.status(401).json({message:err.message});
    }
}
module.exports={userAuth};