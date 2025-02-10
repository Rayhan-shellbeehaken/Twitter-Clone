import { addNewTweet, getAllTweet, updateATweet } from "@/app/repository/tweet/tweetRepository";

export async function addTweet(user,request) {
    const formData = await request.formData();
    const postImage = formData.get('postImage') || "";
    const postText = formData.get('postText') || "";
    
    if(postImage){
        const bufferData = await postImage.arrayBuffer();
        const base64 = Buffer.from(bufferData);

        const tweet = await addNewTweet(postText,base64,user);
        return tweet;
    }
    else{
        const tweet = await addNewTweet(postText, null, user);
        return tweet;
    }
}

export async function getTweets(page) {
    const tweets = await getAllTweet(page);
    return tweets;
}

export async function updateTweet(tweetId,request) {
    const formData = await request.formData();
    let data = {};
    formData.forEach((value, key) => {
        data[key] = value;
    });
    const tweet = await updateATweet(tweetId,data);
    return tweet;
}