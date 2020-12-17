module.exports=async (req,res,next)=>{
    if(!req.isAuthenticated()){
        return res.json({error:"Please login !"})
    }
    next();
}