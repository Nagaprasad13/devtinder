const mongoose=require('mongoose');
const validator=require('validator');
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
        trim:true,
        validate(value){
            if(!validator.isEmail(value)){
                throw new Error("Invalid email:"+value);
            }
        }
    },
    password:{
        type:String,
        required:true,
        minlength:8,
        maxlength:100,
        //validatin the password
        validate(value){
            if(!validator.isStrongPassword(value)){
                throw new Error("Weak password:"+value)
            }
        }
    },
    gender:{
        type:String,
        required:true,
    },
    photoUrl:{
        type:String,
        default:"https://th.bing.com/th/id/OIP.iXSYbviP4gC2E0WkkOFdgAHaHa?w=191&h=191&c=7&r=0&o=7&dpr=1.5&pid=1.7&rm=3"
    }
   
}, {
    timestamps:true});
const User=mongoose.model("users",userScheme);
module.exports={User};