import mongoose from "mongoose";

const { Schema, Types } = mongoose; // Destructure Schema and Types from mongoose

const conversationSchema = new Schema(
    {
        participants: [
            {
                type: Types.ObjectId, // Correctly use Types.ObjectId
                ref: "User", // Reference the User model
            },
        ],
        messages: [
            {
                type: Types.ObjectId, // Correctly use Types.ObjectId
                ref: "Message", // Reference the Message model
                default: [], // Default value as an empty array
            },
        ],
    },
    { timestamps: true } // Enable automatic timestamps
);

const Conversation = mongoose.model("Conversation", conversationSchema);

export default Conversation;
