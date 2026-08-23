const {connectDb}=require('./config/database');
const express=require('express');
const app=express();
const mongoose=require('mongoose');
const {User}=require('./models/user');
app.use(express.json());
        app.post('/user',async (req,res)=>{
            const user=new User(req.body);
            try{
                await user.save();
                res.status(201).send('new user created');
            }
            catch(err){
                res.send('error in creating new user');
                res.status(404);
            }

        });
app.get('/feed',async (req,res)=>{
    try{
        const users=await User.find({});
        res.send(users.json());  
    }
    catch(err){
        res.status(401).send('No user found');''
    }
});
app.delete('/user',async (req,res)=>{
    const userId=req.body.userId;
    try{
        const user=await User.findByIdAndDelete(userId);
        res.status(201).send('user deleted..');
    }
    catch(err){
        res.send('error in deleting').status(401);
    }
})
app.patch('/user',async (req,res)=>{
    try{
        await User.findByIdAndUpdate(req.body.userId,req.body);
        res.send("user updated");
    }
    catch(err){
        res.status(404).send('error');
    }
})
connectDb().then(()=>{
    console.log('connected to db..');
    app.listen(5740);
}).catch((err)=>{
    console.log('error in connecting to DB');
})