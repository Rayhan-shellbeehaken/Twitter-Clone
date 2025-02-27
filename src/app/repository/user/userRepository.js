import User from "@/app/models/user.model";
import mongoose, { mongo } from "mongoose";

export async function getUserInfo(username) {
    const user = await User.findOne({username : username});
    return user;
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