const mongoose=require("mongoose");

const locationSchema=mongoose.locationScehma({
    location_name:{
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
},{timestamp:true});

const Location=mongoose.model("location",locationSchema);
module.exports=Location;