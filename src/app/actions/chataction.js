import axios from "axios";

export async function getChatList() {
    try{
        const result = await axios.get('/api/messages');
        return result;
    }catch(error){
        throw error;
    }
}

export async function getMessages(roomId) {
    try{
        const result = await axios.get(`/api/messages?roomId=${roomId}`);
        return result;
    }catch(error){
        throw error;
    }
}

export async function addARoom(data) {
    try{
        const result = await axios.post('/api/messages',data);
        return result;
    }catch(error){
        throw error;
    }
}

export async function updateMessageStatus(data) {
    try{       
        const result = await axios.patch(`/api/messages?status=true`,data);
        return result;
    }catch(error){
        throw error;
    }
}

export async function addMessage(data) {
    try{       
        const result = await axios.patch(`/api/messages`,data);
        return result;
    }catch(error){
        throw error;
    }
}