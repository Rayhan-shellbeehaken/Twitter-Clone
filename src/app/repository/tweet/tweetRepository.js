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
    const tweets = await Tweet.aggregate([
        {
          $lookup: {
            from: "users",
            localField: "user",
            foreignField: "_id",
            as: "user_details"
          }
        },
        {
          $addFields: {
            user_details: {
              $arrayElemAt : ["$user_details",0]
            }
          }
          },
        {
          $project: {
            __v : 0,
            user : 0,
            "user_details.email" : 0,
            "user_details.__v" : 0,
            "user_details.dateofBirth" : 0,
            "user_details.isVerified" : 0
          }
        }
    ]).sort({createdAt : -1}).skip(offset).limit(limit);
    
    return tweets;
}

export async function updateATweet(tweetId,data) {
    const tweet = await Tweet.findByIdAndUpdate(tweetId, 
        { $set : data},
        { new : true, runValidators : true});
    return tweet;
}