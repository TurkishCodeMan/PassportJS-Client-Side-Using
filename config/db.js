const mongoose=require("mongoose");

const connectDB=async (req,res,next)=>{
    try {
        await mongoose.connect("mongodb://localhost:27017/passportjs",{useNewUrlParser:true,useUnifiedTopology:true})
        console.log("Connected Database")
    } catch (error) {
        return error;
    }
}

module.exports=connectDB;