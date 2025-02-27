import User from "@/app/models/user.model";
import mongoose from "mongoose";

export async function getUserInfo(username) {
    const user = await User.findOne({username : username});
    return user;
}
export async function updateUserInfo(id,reqBody,followed) {

    if(reqBody.newFollower){
        const field = "followers";
        const value = new mongoose.Types.ObjectId(reqBody.newFollower);
        console.log("DATABSE");
        console.log(followed);
        console.log(typeof(followed));
        const user = followed === "false" ? 
        await User.findByIdAndUpdate(
            id,
            { $push: { [field]: value } },
            { new: true, runValidators: true }
        ) : 
        await User.findByIdAndUpdate(
            id,
            { $pull: { [field]: value } },
            { new: true, runValidators: true }
        ) ;

        return user;
    }else{
        const user = await User.findByIdAndUpdate(id,reqBody,{
            new : true,
            runValidators : true,
        });
        return user;
    }
}