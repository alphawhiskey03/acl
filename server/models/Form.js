const mongoose=require("mongoose");

const formSchema=mongoose.Schema({
    form_name:{
        type:String,
        required:true,
        unique:[true,"labels must be unique"]
    },
    components:{}
})

const Form=mongoose.model("form",formSchema);
module.exports=Form;