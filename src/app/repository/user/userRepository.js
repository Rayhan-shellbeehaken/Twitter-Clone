import User from "@/app/models/user.model";
import mongoose, { mongo } from "mongoose";

export async function getUserInfo(username) {
    const user = await User.aggregate([
        {
          $match: {
            username : username
          }
        },
        {
          $lookup: {
            from: "users",
            localField: "following",
            foreignField: "_id",
            as: "following"
          }
        },
        {
          $project: {
            password : 0,
            isVerified : 0,
            __v : 0,
            "following.createdAt" : 0,
            "following.followers" : 0,
            "following.following" : 0,
            "following.email" : 0,
            "following.__v" : 0,
            "following.isVerified" : 0,
          }
        }
    ]);
    return user[0];
}

export async function updateUserInfo(id,reqBody,followed) {
    if(reqBody.newFollower){
        const field = "followers";
        const value = new mongoose.Types.ObjectId(reqBody.newFollower);
        const user = followed === "false" ? await onFollow(id,value) : await onUnFollow(id,value);
        return user;
    }else{
        const user = await User.findByIdAndUpdate(id,reqBody,{
            new : true,
            runValidators : true,
        });
        return user;
    }
}

async function onFollow(id,value) {
    const user = await User.findByIdAndUpdate(
        id,
        { $push: { ["followers"]: value} },
        { new: true, runValidators: true}
    )
    await User.findByIdAndUpdate(
        value,
        {$push : { ["following"]: new mongoose.Types.ObjectId(id)} },
        {new: true, runValidators: true}
    )
    return user;
}

async function onUnFollow(id,value) {
    const user = await User.findByIdAndUpdate(
        id,
        { $pull: { ["followers"]: value } },
        { new: true, runValidators: true }
    )
    await User.findByIdAndUpdate(
        value,
        {$pull : { ["following"]: new mongoose.Types.ObjectId(id)} },
        {new: true, runValidators: true}
    )
    return user;
}