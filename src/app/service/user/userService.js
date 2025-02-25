import { getUserInfo, updateUserInfo } from "@/app/repository/user/userRepository";

export async function getUser(id) {
    const user = await getUserInfo(id);
    return user;
}

export async function updateUser(id,reqBody){
    const user = await updateUserInfo(id, reqBody);
    return user;
}