import { addNewTweet, getAllTweet, updateATweet } from "@/app/repository/tweet/tweetRepository";

export async function addTweet(user,request) {
    const requestBody = await request.json();
    const {postText, postImage} = requestBody;
    const tweet = await addNewTweet(postText, postImage, user);
    return tweet;
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
    if(data.reacters === '') data.reacters = [];
    const tweet = await updateATweet(tweetId,data);
    return tweet;
}