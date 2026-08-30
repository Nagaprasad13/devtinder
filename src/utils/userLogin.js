const userLogin=(emailId,password)=>{
    if(!emailId||!password){
        throw new Error("Invald Credentials");
    }
};
module.exports={userLogin};