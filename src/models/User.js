import mongoose from "mongoose";

const userSchema=new mongoose.Schema(
    {
        username: {
            type:String,
            unique:true
        },
        email: {type:String,
            unique:true
            
        },
        password:{
            type:String,
            require:true,
            select:false
        },
        role:{
            type:String,
            enum:["user","admin"],
            default:"user"
        },
        createdAt:{
            type:Date,
            default: Date.now,
        }
    },
)
    
const User = mongoose.model("User", userSchema);

export default User;