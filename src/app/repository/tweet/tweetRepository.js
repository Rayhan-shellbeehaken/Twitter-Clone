import Tweet from "@/app/models/tweet.model";

export async function addNewTweet(postText, postImage, user) {
    const newTweet = new Tweet({
        postText,
        postImage,
        user
    });

    const saveTweet = await newTweet.save();
    return saveTweet;
}

export async function getAllTweet(page) {
    const limit = 7;
    const offset = (page - 1) * limit;
    const tweets = await Tweet.find({}).sort({createdAt : -1}).skip(offset).limit(limit);
    return tweets;
}

export async function updateATweet(tweetId,data) {
    console.log("DATA :: ");
    console.log(data);
    const tweet = await Tweet.findByIdAndUpdate(tweetId, 
        { $set : data},
        { new : true, runValidators : true});
    return tweet;
}