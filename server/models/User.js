const mongoose=require("mongoose");
const bcrypt=require("bcrypt");



const userSchema=new mongoose.Schema({
    fname:{
        type:String,
        required:[true,"First name is required"]
    },
    lname:{
        type:String,
        required:[true,"Last name is required"]
    },  
    email:{
        type:String,
        required:[true,"Email cannot be empty."],
        unique:true,
        lowercase:[true,"Email cannot container uppercase."] ,// takes the val and converts it into lower case.
    },
    password:{
        type: String,
        required:[true,"Please enter a password"],
        minlength:[6,'Password must be minimum 6 characters']
    },
    role_id:{
        type:String,
        required:true,
    },
    role_name:{
        type:String,
        required:true,
    },
    location_id:{
        type:String,
        required:true
    },
    created_by:{
        type:String
    }

},{timestamps:true});

userSchema.pre('save', async function (next){
    const salt=await bcrypt.genSalt();
    this.password=await bcrypt.hash(this.password,salt);
    console.log('The document is about to be created',this);
    next();
});

userSchema.statics.login= async function(email,password){ 
    const user=await this.findOne({email});
    //In the above line this refers to the user model itself. it says find if theres a user with the given email in the model
    if(user){
     const auth=await bcrypt.compare(password,user.password);
     // In the above line we didnt hash the password before comparing it with the password from db(user.password)
     // as the bcrypt does it for us under the hood.
     if(auth){
         return user;
     }
     throw Error("Incorrect password")
    }
    throw Error("Invalid email");
}
const User=mongoose.model('user',userSchema);
module.exports=User;