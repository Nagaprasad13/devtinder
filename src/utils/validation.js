const validator=require('validator');
const validation=(firstName,lastName,emailId,password)=>{
    if(!firstName||!lastName||!emailId||!password){
        throw new Error('Invalid Creentials');
    }
    if(firstName<4||firstName>50||lastName<2||lastName>50){
        throw new Error('Ivalid Credentials');
    }
    if(!validator.isStrongPassword(password)){
        throw new Error('InvailCredentials');
    }
    if(!validator.isEmail(emailId)){
        throw new Error('Invalid Credentls');
    }
}
module.exports={validation};