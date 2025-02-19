"use server"
import { auth } from "@/auth";
export async function fetchNotification(user) {
    const session = await auth();
    if(!session?.user){
        throw new Error("User doesn't exist!!");
    }
    const response = await fetch(`http://localhost:3000/api/notifications?user=${user}`,{
            method: 'GET',
            cache: 'no-store' 
        }
    );
    if(!response.ok){
        throw new Error("Paitesi na notification");
    }
    const data = await response.json();
    return data;
}