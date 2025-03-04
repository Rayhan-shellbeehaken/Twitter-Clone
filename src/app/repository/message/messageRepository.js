import Conversations from "@/app/models/conversation.model";
import mongoose from "mongoose";

export async function createNewConversation(data) {
    const {person1, person2} = data;
    const exist = await Conversations.findOne({
        $or : [
            {person1, person2},
            {person1 : person2, person2 : person1}
        ]
    });
    if(exist) return exist._id;
    
    const newConversation = new Conversations(data);
    const conversation = await newConversation.save();
    return conversation._id;
}

export async function addMessage(id,data){
    const conversation = await Conversations.findByIdAndUpdate(
        id,
        {$push : { messages : data}},
        { new: true, runValidators: true }
    )
    return conversation;
}