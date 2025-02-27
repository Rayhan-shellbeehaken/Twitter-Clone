import { auth } from "@/auth";
export async function fetchTweet(page,parent,user,filterBy) {
    const session = await auth();
    if(!session?.user){
        throw new Error("User doesn't exist!!");
    }
    // let userId = user !== null ? user : null;
    const response = 
    await fetch(`http://localhost:3000/api/tweets?page=${page}&parent=${parent}&user=${user}&filterBy=${filterBy}`,{
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

export async function fetchATweet(tweetId) {
    const session = await auth();
    if(!session?.user) throw new Error("Login Please");
    const response = await fetch(`http://localhost:3000/api/tweets?tweetId=${tweetId}`,{
        method : "GET"
    });
    if(!response.ok) throw new Error('Failed to fetch tweet');
    const data = await response.json();
    return data;
}