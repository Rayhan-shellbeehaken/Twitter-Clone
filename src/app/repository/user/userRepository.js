import User from "@/app/models/user.model";

export async function getUserInfo(id) {
    const user = await User.findById(id);
    return user;
}
export async function updateUserInfo(id,reqBody) {
    const user = await User.findByIdAndUpdate(id,reqBody,{
        new : true,
        runValidators : true,
    })
    return user;
}