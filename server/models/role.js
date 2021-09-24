const mongoose=require("mongoose");

const RoleSchema=mongoose.Schema({
    role_name:{
        type:String,
        required: true
    },
    status:{
        type:String,
        required:true
    },
    created_by:{
        type:String,
        required:true
    }

},{timestamps:true});

const Role=mongoose.model("role",RoleSchema);
module.exports=Role;