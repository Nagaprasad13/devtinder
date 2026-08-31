const jwt=require('jsonwebtoken');
const {User}=require('../models/user');
const userAuth=async (req,res,next)=>{
    try{
        const {token}=req.cookies;
        if(!token){
            throw new Error('Please Login');
        }
        const decoded=jwt.verify(token,"devTinder@1303");
        const userId=decoded.userId;
        const user=await User.findById(userId);
        req.user=user;
        next();
    }
    catch(err){
        res.status(401).send('Unauthorized access:'+err.message);
    }
}
module.exports={userAuth};