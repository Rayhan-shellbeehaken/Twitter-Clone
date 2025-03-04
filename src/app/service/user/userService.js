import { getUserInfo, getUserInfoById, updateUserInfo } from "@/app/repository/user/userRepository";

export async function getUser(id,username) {
    let user;
    if(id) user = await getUserInfoById(id);
    else if(username) user = await getUserInfo(username);
    return user;
}

export async function updateUser(id,reqBody,followed){
    const user = await updateUserInfo(id,reqBody,followed);
    return user;
}