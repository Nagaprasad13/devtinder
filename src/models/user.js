const mongoose=require('mongoose');
const jwt=require('jsonwebtoken');
const validator=require('validator');
const bcrypt=require('bcrypt');
const userSchema=new mongoose.Schema({
    firstName:{
        type:String,
        required:true,
        minlength:4,
        maxlength:50
    },
    lastName:{
        type:String,
        required:true,
        minlength:2,
        maxlength:50
    },
    emailId:{
        type:String,
        required:true,
        validation(value){
            if(!validator.isEmail(value)){
                throw new Error("Invalid Credentials");
            }
        }
    },
    password:{
        type:String,
        required:true,
        validation(value){
            if(!validator.isStrongPassword(value)){
                throw new Error("Invalid Credentials");
            }
        }
    }
});
userSchema.methods.getJWT=function(){
    return jwt.sign({userId:this._id},"devTinder@1303");//{}->is a plain object....
};
userSchema.methods.verifyPassword=function(userPassword){
    return bcrypt.compare(userPassword,this.password);
};
const User=mongoose.model("Users",userSchema);
module.exports={User};