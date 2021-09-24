const mongoose=require("mongoose");


const EventSchema=mongoose.Schema({
    name:{
        type:String,
        required:[true,"Event name cannot be empty"],
        unique:true
    },
    description:{
        type:String,
        required:[true,"The description cannot be empty"],
    }

},{timestamps:true});

const Event=mongoose.model("event",EventSchema);
module.exports=Event;