import Tweet from "@/app/models/tweet.model";

export async function addNewTweet(postText, image, user) {
    const newTweet = new Tweet({
        postText,
        image,
        user
    });

    const saveTweet = await newTweet.save();
    return saveTweet;
}