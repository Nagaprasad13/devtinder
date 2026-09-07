const jwt=require('jsonwebtoken');
const mongoose=require('mongoose');
const validator=require('validator');
const bcrypt=require('bcrypt');
const skillSchema=mongoose.Schema({name:String});
const userSchema=mongoose.Schema({
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
        maxlength:40
    },
    emailId:{
        type:String,
        required:true,
        validate(value){
            if(!validator.isEmail(value)){
                throw new Error("Invalid Credentials");
            }
        },
        unique:true
    },
    password:{
        type:String,
        required:true,
        validate(value){
            if(!validator.isStrongPassword(value)){
                throw new Error('Invalid Credentials');
            }
        }
    },
    skills:{
        type:Array,
    }
},{timestamps:true});
userSchema.methods.getJWT=function(){
    return jwt.sign({userId:this._id},"devTinder@1303");
};
userSchema.methods.verifypass=async function(value){
    return await bcrypt.compare(value,this.password);
}
const User=mongoose.model("users",userSchema);
module.exports={User};