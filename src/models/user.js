const mongoose=require('mongoose');
//creating schema means creating a exo-Skeleton
const userSchema=mongoose.Schema({
    name:String,
    age:Number,
    UniqueSkill:[String],
    level:Number,
    attributes:[{
        attack:Number,
        defence:Number,
        arcane:Number,
        Strength:Number

    }],

});
const User=mongoose.model("users",userSchema);
module.exports={User}