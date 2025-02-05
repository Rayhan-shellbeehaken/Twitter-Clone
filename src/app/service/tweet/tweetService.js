import { addNewTweet } from "@/app/repository/tweet/tweetRepository";

export async function addTweet(user,reqBody) {
    const {postText, image} = await reqBody.json();
    const tweet = await addNewTweet(postText,image,user);
    return tweet;
}