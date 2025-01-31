import { updateUserInfo } from "@/app/repository/user/userRepository";

export async function updateUser(id,reqBody){
    const user = await updateUserInfo(id, reqBody);
    return user;
}