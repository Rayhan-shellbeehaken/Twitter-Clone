import mongoose from "mongoose";
import messageSchema from "./schemas/message.schema";

const conversationSchema = new mongoose.Schema({
    person1 : {
        type : mongoose.Types.ObjectId,
        ref : "users",
        required : true
    },
    person2 : {
        type : mongoose.Types.ObjectId,
        ref : "users",
        required : true
    },
    messages : [messageSchema]
})

const Conversations = mongoose.models.conversations || mongoose.model("conversations", conversationSchema);

export default Conversations;