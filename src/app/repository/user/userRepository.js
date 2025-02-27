import User from "@/app/models/user.model";
import mongoose from "mongoose";

export async function getUserInfo(username) {
    const user = await User.findOne({username : username});
    return user;
}
export async function updateUserInfo(id,reqBody) {

    if(reqBody.newFollower){
        const field = "followers";
        const value = new mongoose.Types.ObjectId(reqBody.newFollower);
        const user = await User.findByIdAndUpdate(
            id,
            { $push: { [field]: value } },
            { new: true, runValidators: true }
        );
        return user;
    }else{
        const user = await User.findByIdAndUpdate(id,reqBody,{
            new : true,
            runValidators : true,
        });
        return user;
    }
}