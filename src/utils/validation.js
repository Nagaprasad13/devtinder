const validator=require('validator');
const userValidation=(req)=>{
    const genders=["female","male","others"];
    const {name,emailId,password,gender}=req.body;
    if(!genders.includes(gender)){
        throw new Error("Invalid Gender");
    }
    if(!name||!password||!gender||name.length<4||name.length>50){
        throw new Error("Invalid Credentials");
    }
    if(!validator.isStrongPassword(password)){
        throw new Error('Invalid Credentials');
    }
    if(!validator.isEmail(emailId)){
        throw new Error('Invalid Credentials');
    }
}
module.exports={userValidation};