const jwt=require("jsonwebtoken");
const User = require("../models/User");

const requireAuth=(req,res,next)=>{
    const {token}=req.body;
    console.log(req.body.email);
    console.log(token);
    jwt.verify(token,"vig secret",(err,decodedToken)=>{
        if(err){
            console.log(err);
            res.status(401).json({message:"Login required"});
        }else{
            console.log(decodedToken);
            next();
        }
    })
}

const requireAdminAccess=(req,res,next)=>{
    const {token}=req.body;
    jwt.verify(token,"vig secret",async (err,decodedToken)=>{
        if(err){
            console.log(err);
            res.status(400).json("The credentials are invalid");
        }else{
            let user=await User.findById(decodedToken.id);
            console.log(user);
            if(user.role_name!=="admin"){
                console.log("admin");
                res.status(403).json({message:"You don't have access to the route"})
            }
            next();
        }
    })
}

module.exports={
    requireAuth,
    requireAdminAccess
}