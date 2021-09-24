const { compareSync } = require("bcrypt");
const jwt=require("jsonwebtoken");
const Permission=require("../models/permission");
const Role=require("../models/role");
const Form=require("../models/Form");


module.exports.welcome=(req,res)=>{
    res.send("hello world");
}

module.exports.getRoles=async(req,res)=>{
    const roles=await Role.find({});
    if(roles){
        res.status(200).json(roles);

    }
}

// module.exports.getPermission=async(req,res)=>{
//     const {id}=req.body;
//     try{
//     const permission=await Permission.find({role_id:id});
//     res.status(201).json(permission);
//     }catch(err){
//         res.status(500).json({message:"Something wen't wrong"})
//     }
// }

module.exports.getPermission=async(req,res)=>{
    const {id}=req.body;
    console.log(req.body);
    console.log(id);
    const permission=await Permission.aggregate([{
        $match: {
          role_id: id
        }
    
      },
      {
        $project: {
          menu_id: {
            $toObjectId: "$menu_id"
          },
          del:1,
          read:1,
          write:1,
          download:1,
          overall:1
        }
      },
      {
        $lookup: { 
        from: "menus",
        as: "menus",
        let:{menu_id:"$menu_id"},
        pipeline:[
            {
              $match:{
                $expr:{$eq:["$$menu_id","$_id"]},
              }
            },
            {
              $project:{
                  parent_menu_id:0,
                  sort_order:0,
                  status:0,
                created_by:0,
                createdAt:0,
                updatedAt:0,
              }
            }
        ]
      }
      },
      ])
      var menus={};
      permission.forEach(pr=>{
          menus[`${pr.menus[0].menu_name}`]=pr.menus[0];
          console.log("---");
          console.log(pr._id);
          console.log("--")
          Object.assign(menus[`${pr.menus[0].menu_name}`],{del:pr.del,read:pr.read,write:pr.write,download:pr.download,overall:pr.overall,permission_id:pr._id});

      })
      console.log(menus);
      res.status(201).json(menus);
    }

module.exports.updatePermissions= async (req,res)=>{
  const {permissions}=req.body;
  console.log(permissions);
  try{
    
  Object.entries(permissions).map(async([key,value])=>{
    console.log(value.permission_id);
     let perm=await Permission.findOneAndUpdate({_id:value.permission_id},{
      read:value.read,
      del:value.del,
      write:value.write,
      download:value.download,
      overall:value.overall
    })
    console.log(perm);
  })
  res.status(201).json({message:"Successfully updated"});
  console.log("Success");
}catch(err){
  console.log(err);
  res.status(500).json({message:"Something went wrong"})
}

}

module.exports.addForm=async (req,res)=>{
  try{
  const {data}=req.body;
  console.log(data);
  console.log(data.form_name);
  console.log(data.components);  
  const form=await Form({
    form_name:data.form_name,
    components:data.components
  })
  form.save();
  res.status(201).json({message:"Succesfully created"})
}catch(err){
  console.log(err);
  res.status(500).json({message:"Something went wrong"});
}
}

module.exports.getForms=async(req,res)=>{
  try{
  const forms=await Form.find({},{components:0});
  console.log(forms);
  res.status(200).json(forms)
  }catch(err){
    console.log(err);
    res.status(500).json({message:"Something went wrong"})
  }
}

module.exports.getForm=async(req,res)=>{
  const {id}=req.body;
  console.log(req.body);
  console.log("----");
  console.log(id);
  console.log("----");
  try{
  const form=await Form.findById(id);
  res.status(200).json(form);
  }catch(err){
    console.log(err);
    res.status(500).json({message:"Something went wrong"})
  }

}