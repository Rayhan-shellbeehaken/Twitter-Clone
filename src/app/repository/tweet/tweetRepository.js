import Tweet from "@/app/models/tweet.model";

export async function addNewTweet(postText, base64, user) {
    const newTweet = new Tweet({
        postText,
        postImage : base64,
        user
    });

    const saveTweet = await newTweet.save();
    return saveTweet;
}