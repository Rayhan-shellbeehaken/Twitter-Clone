import User from "@/app/models/user.model";

export async function updateUserInfo(id,reqBody) {
    const user = await User.findByIdAndUpdate(id,reqBody,{
        new : true,
        runValidators : true,
    })
    return user;
}