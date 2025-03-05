import { cookies } from "next/headers";

export async function getChatList() {
    const cookieHeaders = await cookies();
    const response = await fetch(`http://localhost:3000/api/messages`,{
        method : 'GET',
        headers: { Cookie: cookieHeaders.toString() },
        credentials: 'include'
    })
    if(!response.ok){
        throw new Error('chat list fetching problem');
    }
    const data = await response.json();
    return data;
}