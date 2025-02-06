import { addNewTweet } from "@/app/repository/tweet/tweetRepository";

export async function addTweet(user,reqBody) {
    const formData = await reqBody.formData();
    const postImage = formData.get('postImage') || "";
    const postText = formData.get('postText') || "";

    const bufferData = await postImage.arrayBuffer();
    const base64 = Buffer.from(bufferData);

    const tweet = await addNewTweet(postText,base64,user);
    return tweet;
}