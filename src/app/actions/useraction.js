import axios from "axios";

export async function getUserInfo(username) {
    try{
        const result = await axios.get(`/api/user?username=${username}`);
        return result.data;
    }catch(error){
        throw error;
    }
}

export async function updateUserInfo(data) {
    try{
        const result = await axios.patch('/api/user',data);
        return result;
    }catch(error){
        throw error;
    }
}

export async function addFollow(userId,followed,data) {
    try{
        const result = await axios.patch(`/api/user?id=${userId}&followed=${followed}`,data);
        return result;
    }catch(error){
        throw error;
    }
}