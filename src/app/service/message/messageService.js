import { addNewMessage, getAllMessages, createNewRoom, getChatList, changeMessageStatus } from "@/app/repository/message/messageRepository";
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
    const conversation = await addNewMessage(roomId, user, newMessage);
    return conversation;
}

export async function changeStatus(user, request) {
    const requestBody = await request.json();
    const {roomId, status} = requestBody;
    const conversation = await changeMessageStatus(roomId, user, status);
    return conversation;
}

export async function getMessages(roomId) {
    const messages = await getAllMessages(roomId);
    return messages;
}

export async function getChats(userId) {
    const chatList = await getChatList(userId);
    return chatList;
}