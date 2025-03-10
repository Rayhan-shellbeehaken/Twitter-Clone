import axios from "axios";

export async function postANotification(data) {
    try{
        const result = await axios.post('/api/notifications',data);
        return result.data;
    }catch(error){
        throw error;
    }
}