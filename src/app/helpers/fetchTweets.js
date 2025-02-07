import { auth } from "@/auth";
export default async function fetchTweet() {
    const session = await auth();
    if(!session?.user){
        console.log("USER PAI NAI");
        throw new Error("User doesn't exist!!");
    }
    console.log(session?.user);
    const response = await fetch("http://localhost:3000/api/tweets",{
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