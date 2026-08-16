const auth=(req,res,next)=>{
    const authentication='xy';
    if(authentication!=='xyz'){
        console.log('error in authentication');
        res.status(404).send('error')
    }
    
    else{
        console.log('correct user');
        next();
    }
}
module.exports={auth,};