import User from "@/app/models/user.model";

export async function getUserInfo(username) {
    const user = await User.findOne({username : username});
    return user;
}
export async function updateUserInfo(id,reqBody) {
    const user = await User.findByIdAndUpdate(id,reqBody,{
        new : true,
        runValidators : true,
    })
    return user;
}