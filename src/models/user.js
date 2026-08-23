const mongoose=require('mongoose');
const userScheme=new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    emailId:{
        type:String,
        required:true,
        unique:true,
        lowercase:true,
        trim:true
    },
    password:{
        type:String,
        required:true,
        minlength:8,
        maxlength:100,
        //validatin the password
        validate:{
            validator:function(value){
                return /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&]).{8,}$/.test(value);
            },
            message:"Password must contain uppercase,lowercase,number and special character."
    }
    }
});
const User=mongoose.model("users",userScheme);
module.exports={User};