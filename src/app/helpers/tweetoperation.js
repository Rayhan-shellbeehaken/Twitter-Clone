import { auth } from "@/auth";
export async function fetchTweet(page) {
    const session = await auth();
    if(!session?.user){
        console.log("USER PAI NAI");
        throw new Error("User doesn't exist!!");
    }
    const response = await fetch(`http://localhost:3000/api/tweets?page=${page}`,{
            method : "GET",
            cache : "no-store"
        }
    )
    if(!response.ok){
        throw new Error("Sorry pailam na");
    }
    const data = await response.json();
    return data;
}