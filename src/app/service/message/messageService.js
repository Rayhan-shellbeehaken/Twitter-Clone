import { addNewMessage, getAllMessages, createNewRoom } from "@/app/repository/message/messageRepository";
import mongoose from "mongoose";

export async function createRoom(request) {
    const requestBody = await request.json();
    const {roomId} = requestBody;
    const room = await createNewRoom(roomId);
    return room;
}

export async function addMessage(user,request) {
    const requestBody = await request.json();
    const {roomId, text, messageImage} = requestBody;
    const newMessage = {
        text,
        messageImage,
        sender : user
    }
    console.log(newMessage);
    const conversation = await addNewMessage(roomId, newMessage);
    return conversation;
}

export async function getMessages(person1, person2) {
    const user1 = new mongoose.Types.ObjectId(person1);
    const user2 = new mongoose.Types.ObjectId(person2);

    const messages = await getAllMessages(user1, user2);
    return messages;
}