const express=require('express');
const app=express();
const {auth}=require('./middlewares/auth');
app.use('/admin',auth);
app.get('/admin/add',(req,res)=>{
    res.send('new user is added')
});
app.get('/admin/delete',(req,res)=>{
    res.send('user is deleted');
})
app.listen(5700);