import Tweet from "@/app/models/tweet.model";
import mongoose from "mongoose";

export async function addNewTweet(parent,postText,postImage,user,repostedTweet) {
  if(repostedTweet !== null){
    const data = {
      reposterId : user
    }
    const result = await updateATweet(repostedTweet,data);
  }
  const newTweet = new Tweet({
      parent,
      postText,
      postImage,
      user,
      repostedTweet
  });

  const saveTweet = await newTweet.save();
  return saveTweet;
}

export async function getAllTweet(page,parent,user,filterBy) {
  const limit = 7;
  const offset = (page - 1) * limit;
  let matcher = {
    parent : parent==="null" ? null : new mongoose.Types.ObjectId(parent),
    ...(user !== "null" && { user: new mongoose.Types.ObjectId(user) }) 
  }

  if(matcher.user){
    switch (filterBy) {
      case "repost":
        matcher = {
          ...matcher,
          repostedTweet : {$ne : null}
        }
        break;
      case "react":
        delete matcher.user;
        matcher = {
          ...matcher,
          reacters : { $in : [new mongoose.Types.ObjectId(user)]}
        }
        break;
      default:
        break;
    }
  }
  const tweets = await Tweet.aggregate([
      { 
        $match: matcher
      },
      {
        $lookup: {
          from: "tweets",
          localField: "repostedTweet",
          foreignField: "_id",
          as: "reposted_details"
        }
      },
      {
        $addFields: {
          reposted_details: {
            $arrayElemAt : ["$reposted_details",0]
          }
        }
      },
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
        $lookup: {
          from: "users",
          localField: "reposted_details.user",
          foreignField: "_id",
          as: "reposted_user_details"
        }
      },
      {
        $addFields: {
          "reposted_details.user_details": { 
            $arrayElemAt: ["$reposted_user_details", 0] }
        }
      },
      {
        $project: {
          __v : 0,
          user : 0,
          "user_details.email" : 0,
          "user_details.__v" : 0,
          "user_details.dateofBirth" : 0,
          "user_details.isVerified" : 0,
          "repostedTweet" : 0,
          "reposted_details.__v" : 0,
          "reposted_details.parent" : 0,
          "reposted_details.repostedTweet" : 0,
          "reposted_details.createdAt" : 0,
          "reposted_user_details": 0,
          "reposted_details.user_details.email" : 0,
          "reposted_details.user_details.isVerified" : 0,
          "reposted_details.user_details.__v" : 0,
          "reposted_details.user_details.dateofBirth" : 0,
        }
      }
  ]).sort({createdAt : -1}).skip(offset).limit(limit);

  return tweets;
}

export async function getATweet(tweetId) {
  const tweet = await Tweet.aggregate([
    {$match : {_id : new mongoose.Types.ObjectId(tweetId)}},
    {
      $lookup: {
        from: "tweets",
        localField: "repostedTweet",
        foreignField: "_id",
        as: "reposted_details"
      }
    },
    {
      $addFields: {
        reposted_details: {
          $arrayElemAt : ["$reposted_details",0]
        }
      }
    },
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
      $lookup: {
        from: "users",
        localField: "reposted_details.user",
        foreignField: "_id",
        as: "reposted_user_details"
      }
    },
    {
      $addFields: {
        "reposted_details.user_details": { 
          $arrayElemAt: ["$reposted_user_details", 0] }
      }
    },
    {
      $project: {
        __v : 0,
        user : 0,
        "user_details.email" : 0,
        "user_details.__v" : 0,
        "user_details.dateofBirth" : 0,
        "user_details.isVerified" : 0,
        "repostedTweet" : 0,
        "reposted_details.__v" : 0,
        "reposted_details.parent" : 0,
        "reposted_details.repostedTweet" : 0,
        "reposted_details.createdAt" : 0,
        "reposted_user_details": 0,
        "reposted_details.user_details.email" : 0,
        "reposted_details.user_details.isVerified" : 0,
        "reposted_details.user_details.__v" : 0,
        "reposted_details.user_details.dateofBirth" : 0,
      }
    }
  ]);

  return tweet;
}

export async function updateATweet(tweetId,data) {
  if (data.reposterId || data.commentId) {
    const field = data.reposterId ? "reposters" : "commenters";
    const value = data.reposterId || data.commentId;

    const tweet = await Tweet.findByIdAndUpdate(
        tweetId,
        { $push: { [field]: value } },
        { new: true, runValidators: true }
    );

    return tweet;
  }else{
    const tweet = await Tweet.findByIdAndUpdate(tweetId, 
      { $set : data},
      { new : true, runValidators : true});
      return tweet;
  }
}