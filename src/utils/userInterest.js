const statusValidation=(status)=>{
    const validStatus=["interested","rejected","ignored","accepted"];
    const isValid=validStatus.includes(status);
    if(!isValid){
        throw new Error('Invalid Credentials');
    }
};
module.exports={statusValidation};