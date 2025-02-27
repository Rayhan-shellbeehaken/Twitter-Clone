import { getUserInfo, updateUserInfo } from "@/app/repository/user/userRepository";

export async function getUser(username) {
    const user = await getUserInfo(username);
    return user;
}

export async function updateUser(id,reqBody,followed){
    const user = await updateUserInfo(id,reqBody,followed);
    return user;
}