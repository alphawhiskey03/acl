const mongoose=require("mongoose");

const menuSchema=mongoose.Schema({
    menu_name:{
        type:String,
        required:true
    },
    menu_url:{
        type:String,
        default:"none"
    },
    parent_menu_id:{
        type:String,
        default:"none"
    },
    sort_order:{
        type:String,
        required:true
    },
    status:{
        type:String,
        required:true
    },
    created_by:{
        type:String,
        required:true
    }

},{timestamps:true})
const Menu=mongoose.model("menu",menuSchema);
module.exports=Menu;