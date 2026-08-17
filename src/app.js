//connect to db and create a server with a port 
const express=require('express');
const app=express();
const {connectDb}=require('./config/database');
const {User}=require('./models/user');
app.post('/signup',async (req,res)=>{
    try{
    const user=new User({
        name:"nag",
        age:19,
        level:67,
    })
    const data=await user.save();
    console.log(data);
    res.send('user added ans signup');  
}
catch(err){
    res.status(500).send(err.message);
}
})
connectDb().then(()=>{
    console.log("connect to db");
    app.get('/player',(req,res)=>{
        res.send(`the player's data is fetched`);
    })
    app.listen(5740);
}).catch((err)=>{
    console.log(err);
})
