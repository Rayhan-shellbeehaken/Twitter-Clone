import { addNewTweet, getAllTweet, getATweet, updateATweet } from "@/app/repository/tweet/tweetRepository";

export async function addTweet(user,request) {
    const requestBody = await request.json();
    const {postText, postImage, repostedTweet} = requestBody;
    const tweet = await addNewTweet(null,postText, postImage, user,repostedTweet);
    return tweet;
}

export async function getTweets(page,parent) {
    const tweets = await getAllTweet(page,parent);
    return tweets;
}

export async function getTweet(tweetId) {
    const tweet = await getATweet(tweetId);
    return tweet;
}

export async function updateTweet(tweetId,request) {
    let data = await request.json();
    if (data.hasOwnProperty('comment')) {
        const tweet = await addNewTweet(tweetId,data.comment.commentText,data.comment.commentImage,data.comment.userId);
        data = {
            commentId : tweet._id
        }
    }
    const tweet = await updateATweet(tweetId,data);
    return tweet;
}