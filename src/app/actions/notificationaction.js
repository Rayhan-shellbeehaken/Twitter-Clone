import axios from "axios";

export async function postANotification(data) {
    try{
        const result = await axios.post('/api/notifications',data);
        return result.data;
    }catch(error){
        throw error;
    }
}

export async function updateNotification() {
    try{
        const result = await axios.patch('/api/notifications');
        return result;
    }catch(error){
        throw error;
    }
}