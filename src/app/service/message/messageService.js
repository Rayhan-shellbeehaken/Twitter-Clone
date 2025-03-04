import { createNewConversation, addMessage, getAllMessages } from "@/app/repository/message/messageRepository";
import mongoose from "mongoose";

export async function addNewMessage(user,request) {
    const requestBody = await request.json();
    const {person1, person2, text, messageImage} = requestBody;
    const data = {
        person1,
        person2
    }
    const id = await createNewConversation(data);
    
    const newMessage = {
        text,
        messageImage,
        sender : user
    }

    const conversation = await addMessage(id, newMessage);
    return conversation;
}

export async function getMessages(person1, person2) {
    const user1 = new mongoose.Types.ObjectId(person1);
    const user2 = new mongoose.Types.ObjectId(person2);

    const messages = await getAllMessages(user1, user2);
    return messages;
}