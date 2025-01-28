import mongoose from "mongoose";

const userSchema =new mongoose.Schema({
    fullName:{
        type:String,
        requried:true
    },
    username:{
        type:String,
        requried:true,
        unique:true,
    },
    password:{
        type:String,
        requried:true,
        minlength:6,
    },
    gender:{
        type:String,
        requried:true,
        enum:["male","female"],
    },
    profilePic:{
        type:String,
        default:"",
    },

},
//ceratedAt,UpdatedAt
 {timestamps:true}
);

const User =mongoose.model("User",userSchema);

export default User;