"use server"
import { auth } from "@/auth";

export async function fetchNotification(user,category) {
    const session = await auth();
    if(!session?.user){
        throw new Error("User doesn't exist!!");
    }
    const response = await fetch(`http://localhost:3000/api/notifications?user=${user}&category=${category}`,{
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

export async function notificationMessage(type){
    let message="";
    switch (type) {
      case "react":
        message = "reacted to your tweet"
        break;
      case "comment":
        message = "commented to your tweet"
        break;
      case "reply":
        message = "replied to your comment"
        break;
      case "repost":
        message = "reposted your tweet"
        break;
      case "follow":
        message = "followed you"
      default:
        break;
    }
    return message;
}