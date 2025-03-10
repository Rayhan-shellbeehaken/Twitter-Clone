import axios from "axios";

export async function getUserInfo(username) {
    try{
        const result = await axios.get(`/api/user?username=${username}`);
        return result.data;
    }catch(error){
        throw error;
    }
}