const validator=require('validator');
const validation=(firstName,lastName,emailId,password)=>{
    if(!firstName||!lastName||!emailId||!password){
        throw new Error('Invalid Credentials');
    }
    if(firstName>50||lastName>40){
        throw new Error('Invalid Credentials');
    }
    if(firstName<4||lastName<2){
        throw new Error('Invalid Credentials');
    }
    if(!validator.isEmail(emailId)){
        throw new Error('Invalid Credentials');
    }
    if(!validator.isStrongPassword(password)){
        throw new Error('Invalid Credentials');
    }
}
module.exports={validation};