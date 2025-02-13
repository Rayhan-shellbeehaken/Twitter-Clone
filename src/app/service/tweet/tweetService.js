import { addNewTweet, getAllTweet, getATweet, updateATweet } from "@/app/repository/tweet/tweetRepository";

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

export async function getTweet(tweetId) {
    const tweet = await getATweet(tweetId);
    return tweet;
}

export async function updateTweet(tweetId,request) {
    const data = await request.json();
    const tweet = await updateATweet(tweetId,data);
    return tweet;
}