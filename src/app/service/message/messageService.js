import { createNewConversation, addMessage } from "@/app/repository/message/messageRepository";

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