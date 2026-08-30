const mongoose=require('mongoose');
const connectDb=async (req,res)=>{
    await mongoose.connect('mongodb+srv://nagaprasad01303_db_user:Blackswordsman13@node.ogvj7mw.mongodb.net/Dev_Tinder');
};
module.exports={connectDb};