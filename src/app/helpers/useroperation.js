import { cookies } from "next/headers";

export async function fetchUser(username) {
    const cookieHeaders = await cookies();
    const response = await fetch(`http://localhost:3000/api/user?username=${username}`,{
        method : 'GET',
        headers: { Cookie: cookieHeaders.toString() },
        credentials: 'include'
    })
    if(!response.ok){
        throw new Error('User info fetching problem');
    }
    const data = await response.json();
    return data;
}