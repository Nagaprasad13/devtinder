const {User}=require('../models/user.js');
const bcrypt=require('bcrypt');
const userLogin=async ({emailId,password})=>{
    const exist=await User.findOne({emailId:emailId});
    if (!exist) {
        throw new Error('Invalid Credentials');
    }
    const registered=await bcrypt.compare(password,exist.password);  
    if(!registered){
        throw new Error('Invalid Credentials');
    }
}
module.exports={userLogin};