const User=require("../models/User");
const jwt=require("jsonwebtoken");
const bcrypt=require("bcrypt");
const nodemailer=require("nodemailer");
const Permission = require("../models/permission");
const Menu=require("../models/menu");


var transporter=nodemailer.createTransport({
    service:'gmail',
    auth:{
        user:"s.vignesh0300@gmail.com",
        pass:"vigneshnew@2203"
    }
});




const maxAge=3*24*60*60;
const createToken=(id)=>{
    return jwt.sign({id},'vig secret',{
        expiresIn:maxAge
    });
}

module.exports.welcome=(req,res)=>{
    res.send("hiiii");
}

module.exports.signup= async (req,res)=>{
    const {email,password}=req.body;
    console.log('////');
    console.log(req.body);
    try{
        const user=await User.create({email,password});
        const token=createToken(user._id);
        // res.cookie('jwt',token,{httpOnly: true,maxAge:maxAge*1000}); 
        res.status(201).json({user:user._id,token:token,role:user.role});
    }catch(err){
        console.log(err);
    }
}

module.exports.login=async (req,res)=>{
    const {email,password}=req.body;
    console.log(req.body);
    try{
        const user=await User.login(email,password);
        console.log(user);
        const token=createToken(user._id);
        res.status(200).json({user:user._id,token:token,role:user.role});
    }catch(err){
        res.status(401).json({message:"Invalid user"})
        console.log(err);
    }
}

module.exports.forgotPassword= async (req,res)=>{
    const {email}=req.body;
    try{
    const user=await User.findOne({email:email});
    console.log(user);
    const token=createToken(user._id);
    let mailOptions = {
        from: 's.vignesh0300@gmail.com',
        to: email,
        subject: 'Password recovery',
        text: `http://localhost:3001/reset-password/${user._id}/${token}`
      };
      console.log(email);
    
    transporter.sendMail(mailOptions, function(error, info){
        if (error) {
          console.log(error);
        } else {
          console.log('Email sent: ' + info.response);
        }
    });
    res.status(200).json({message:"mail has been sent to your email address"});
    }catch(err){
        res.status(422).json({message:"The mail id that you provided doesn't match with any account"})
        console.log(err)

    }

}

module.exports.resetPassword=async(req,res)=>{
    console.log('hi');
    const {id,token,password}=req.body;
    console.log('here');
    // console.log(id);
    // console.log(token);
    let update={};
    try{
    let payload=jwt.verify(token, 'vig secret');
    if(password){
        const salt=await bcrypt.genSalt();
        let upassword=await bcrypt.hash(password,salt);
        update.password=upassword;
    } 
    // console.log(update);
    
    const user=await User.findByIdAndUpdate(id,update);

    res.status(200).json({message:"success"});
    }catch(err){
        res.status(500).json({message:"Something went wrong"})
        console.log(err);
    }
}

module.exports.updateUser= async (req,res)=>{
    console.log('hi');
    const {userID,email,password,token}=req.body;
    // console.log(req.body);
    // console.log(userID,email,password);
    let update={};
    try{
    // let payload=jwt.verify(token, 'vig secret');
    // console.log(payload);
    // if(payload){
    if(email) update.email=email;
    if(password){
        const salt=await bcrypt.genSalt();
        let upassword=await bcrypt.hash(password,salt);
        update.password=upassword;
    } 
    console.log(update);
    const user=await User.findByIdAndUpdate(userID,update);
    res.status(200).json({status:200,message:"Success"});

    
// }else{
//     throw new Error("Token invalid")
// }
    }catch(err){
        res.status(400).json({message:"token invalid"});
        console.log(err);

    }
}

module.exports.delete=async (req,res)=>{
    const {id}=req.body;
    console.log(id);
    try{
    const user=await User.deleteOne({_id:id});
    if(user){
        res.status(200).json({status:200,message:"User deleted"});
    }else{
        throw new Error("Something went wrong");
    }
    }catch(err){
        res.status(400).json({status:400,message:"Something went wrong"})
        console.log(err)
    }
    
}


module.exports.newLogin=async (req,res)=>{
    const {email,password}=req.body;
    console.log(req.body);
    try{
        const user=await User.login(email,password);
        const token=createToken(user._id);
        const rd = user.role_id;
        const data = await Permission.aggregate([{
          $match: {
            role_id: rd
          }
      
        },
        {
          $project: {
            menu_id: {
              $toObjectId: "$menu_id"
            },
            del: {
              $cond: { if: { $eq: ["$del", true] }, then: true, else: false }
            },
            read: {
              $cond: { if: { $eq: ["$read", true] }, then: true, else: false }
            },
            write: {
              $cond: { if: { $eq: ["$write", true] }, then: true, else: false }
            },
            overall: {
              $cond: { if: { $eq: ["$overall", true] }, then: true, else: false }
            },
            download: {
              $cond: { if: { $eq: ["$download", true] }, then: true, else: false }
            },
            role_id:1 
          }
        },
        {
          $lookup: { 
          from: "menus",
          as: "menus",
          let:{menu_id:"$menu_id",overall:"$overall"},
          pipeline:[
              {
                $match:{
                  $expr:{$eq:["$$menu_id","$_id"]},
                }
              },
              {
                $project:{
                  created_by:0,
                  createdAt:0,
                  updatedAt:0,
                }
              }
          ]
        }
        },
        ])
    
        // console.log(user.role_name);
        accessToken={
            user:{
                fname:user.fname,
                lname:user.lname,
                email:user.email,
                role:user.role_name,
                role_id:user.role_id,
                isAuthenticated:true

            },
            token:token,
            applicationAccess:{
                menus:{}
            }
        }
        console.log(data);
        data.forEach((d)=>{
            console.log(d.menus[0]); 
            accessToken.applicationAccess.menus[`${d.menus[0].menu_name}`]=Object.assign({del:d.del,read:d.read,write:d.write,overall:d.overall,download:d.download},d.menus[0]);
        })
        console.log(accessToken.applicationAccess);
        res.status(200).json({accessToken});

    }catch(err){
        res.status(401).json({message:"Invalid user"})
        console.log(err);
    }
}

module.exports.createUser=async (req,res)=>{
  const {fname,lname,email,password,role_id,role_name,location_id,created_by}=req.body;
  try{
  const user=new User({
    fname,
    lname,
    email,
    password,
    location_id,
    created_by,
    role_id,
    role_name
  })
  user.save();
  res.status(201).json({message:"New User created successfully"})
  
}catch(err){
  console.log(err);
  res.status(500).json({message:"Something went wrong"})
}

}


