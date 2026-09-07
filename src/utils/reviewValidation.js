const reviewValidation=(value)=>{
    const allowed=["accepted","rejected"];
    if(!allowed.includes(value)){
        throw new Error('Invalid Credentials');
    }
};
module.exports={reviewValidation};