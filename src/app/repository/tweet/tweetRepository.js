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

export async function getAllTweet(page) {
    const limit = 7;
    const offset = (page - 1) * limit;
    const tweets = await Tweet.find({}).sort({createdAt : -1}).skip(offset).limit(limit);
    return tweets;
}

export async function updateATweet(tweetId,data) {
    const tweet = await Tweet.findByIdAndUpdate(tweetId, data, {
        new : true,
        runValidators : true
    })
    return tweet;
}