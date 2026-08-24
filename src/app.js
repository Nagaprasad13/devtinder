const {connectDb}=require('./config/database');
const express=require('express');
const app=express();
const mongoose=require('mongoose');
const {User}=require('./models/user');
const bcrypt=require('bcrypt');
const {userValidation}=require('./utils/validation');
const {userLogin}=require('./utils/userLogin');
app.use(express.json());
app.post('/user',async (req,res)=>{
    try{
        userValidation(req);
        const {name,emailId,password,gender}=req.body;
        const passwordHash=await bcrypt.hash(password,10);
        console.log(passwordHash);
        const user=new User({name:name,emailId:emailId,password:passwordHash,gender:gender});
        await user.save();
        res.status(201).send('new user created');
    }   
    catch(err){
        res.status(404).send(err.message);
    }
});
app.post('/login',async (req,res)=>{
    try{
        userValidation(req);
        const {emailId,password}=req.body;
        await userLogin({emailId,password});
        res.status(200).send('Successful Login.');
    }
    catch(err){
        res.status(404).send('Invalid Credentials');
    }
})
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
        const AllowedUpdates=["gender","photo","userId"];
        const isupdateAllowed=Object.keys(req.body).every(k=>AllowedUpdates.includes(k));
        if(!isupdateAllowed){
            throw new Error("cannot update");
        }
        await User.findOneAndUpdate({emailId:req.body.userId},req.body);
        res.send("user updated");
    }
    catch(err){
        res.status(404).send(err.message);
    }
})
connectDb().then(()=>{
    console.log('connected to db..');
    app.listen(5740);
}).catch((err)=>{
    console.log('error in connecting to DB');
})