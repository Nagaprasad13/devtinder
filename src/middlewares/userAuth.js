const users=['gio','fioh','dion'];
const userAuth=(req,res,next)=>{
    const userName=req.params.username;
    const yes=users.includes(userName)
    if(!yes){
        res.status(501).send('user not found')
    }
    next();
}
module.exports={userAuth};