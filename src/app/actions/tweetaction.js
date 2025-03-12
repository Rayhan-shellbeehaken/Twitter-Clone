import axios from "axios";

export async function postATweet(data) {
    try{
        const response = await axios.post('/api/tweets', data);
        return response.data;
    }catch(error){
        throw error;
    }
}

export async function updateATweet(id,data) {
    try{
        const result = await axios.patch(`/api/tweets?id=${id}`,data);
        console.log("RESULT");
        console.log(result);
        return result;
    }catch(error){
        throw error;
    }
}