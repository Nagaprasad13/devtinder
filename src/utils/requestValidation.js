const validation=(value)=>{
    const allowed=["interested","ignored"];
    if(!allowed.includes(value)){
        throw new Error('Invalid Credentials');
    }
};
module.exports={validation};