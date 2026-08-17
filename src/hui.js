const express=require('express');
const app=express();
const users=[
    {"name":"jiuh"},
    {"name":"jiuhddd"},
    {"name":"jiuhaaa"}
]
app.use(express.json());
app.post('/users',(req,res)=>{
    const newUser={
        "name":req.body.name
    };
    users.push(newUser);
    res.status(201).json(users);
})
app.listen(5701);