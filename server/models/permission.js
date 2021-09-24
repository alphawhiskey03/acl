const mongoose=require("mongoose");

const permisionSchema=mongoose.Schema({
    role_id:{
        type:String,
        required:true
    },
    menu_id:{
        type:String,
        required:true
    },
    read:{
        type:Boolean,
        default:false
    },
    write:{
        type:Boolean,
        default:false
    },
    download:{
        type:Boolean,
        default:false
    },
    del:{
        type:Boolean,
        default:false
    },
    overall:{
        type:Boolean,
        default:false
    }
});
const Permission=mongoose.model("Permission",permisionSchema);
module.exports=Permission;