import mongoose from "mongoose";

const messageSchema=new mongoose.Schema(
    {
        senderId:{
            type:mongoose.Schema.Types.ObjectId,
            ref:"User",
            requried:true,
        },
        receiverId:{
            type:mongoose.Schema.Types.ObjectId,
            ref:"User",
            requried:true,
        },
        message:{
            type:String,
            requried:true,
        },
        //createdAt,updatedAt

    },
    {timestamps:true}
);
const Message=mongoose.model("Message",messageSchema);

export default Message;