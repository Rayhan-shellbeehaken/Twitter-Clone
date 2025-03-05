import mongoose from "mongoose";
import messageSchema from "./schemas/message.schema";

const conversationSchema = new mongoose.Schema({
    room : {
        type : String,
        required : true,
        unique : true
    },
    messages : [messageSchema]
})

const Conversations = mongoose.models.conversations || mongoose.model("conversations", conversationSchema);

export default Conversations;