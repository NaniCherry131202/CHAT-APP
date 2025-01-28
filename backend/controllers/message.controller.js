import mongoose from "mongoose";
import Conversation from "../models/conversation.model.js";
import Message from "../models/message.model.js"; // Ensure Message model is imported

export const sendMessage = async (req, res) => {
    try {
        const { message } = req.body; // Message content
        const { id: receiverId } = req.params; // Receiver ID from params
        const senderId = req.user._id; // Sender ID from authenticated user

        // Ensure IDs are properly cast to ObjectId
        const senderObjectId = new mongoose.Types.ObjectId(senderId);
        const receiverObjectId = new mongoose.Types.ObjectId(receiverId);

        // Find the conversation between the two participants
        let conversation = await Conversation.findOne({
            participants: { $all: [senderObjectId, receiverObjectId] },
        });

        // If conversation doesn't exist, create a new one
        if (!conversation) {
            conversation = new Conversation({
                participants: [senderObjectId, receiverObjectId],
                messages: [],
            });
            await conversation.save();
        }

        // Create a new message
        const newMessage = new Message({
            senderId: senderObjectId,
            receiverId: receiverObjectId,
            message,
        });
        //Socket IO FUNCTIONALITY WILL GO HERE

        // Save the message to the database
        await newMessage.save();

        // Add the message ID to the conversation's messages array
        conversation.messages.push(newMessage._id);
        await conversation.save();

        // Respond with the newly created message
        res.status(201).json(newMessage);
    } catch (error) {
        console.error("Error in sendMessage controller:", error.message);
        res.status(500).json({ error: "Internal server error" });
    }
};

export const getMessages=async(req,res)=>{
    try {
        const {id:userToChatId}=req.params;
        const senderId=req.user._id;

        const conversation=await Conversation.findOne({
            participants:{$all:[senderId,userToChatId]},
        }).populate("messages");//NOT REFERNECE BUT ACTUAL MESSAGES
         
        if(!conversation) return res.status(200).json([]);

        const messages=conversation.messages;
        res.status(200).json(messages);
        
    } catch (error) {
        console.error("Error in getMessage controller:", error.message);
        res.status(500).json({ error: "Internal server error" });
    }
}
