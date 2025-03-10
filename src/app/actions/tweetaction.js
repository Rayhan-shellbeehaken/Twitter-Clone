import axios from "axios";

export async function postATweet(data) {
    try{
        const response = await axios.post('/api/tweets', data);
        return response.data;
    }catch(error){
        throw error;
    }
}