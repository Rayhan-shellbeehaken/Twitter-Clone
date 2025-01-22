"use client"
import React from 'react';
import { signOut } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { useSession } from 'next-auth/react'

export default function Home() {
    const router = useRouter();
    const { data: session, status } = useSession();
    const onSignOut = async() => {
        await signOut({
            redirect: false
        });
        router.push("/");
    }

    if(status === "loading"){
        return <div>Loading...</div>
    }

    if(!session){
        return <div>No session available.</div>
    }
    return (
        <div>
            <h1>{session.user?.username}</h1>
            <h1>{session.user?._id}</h1>
            <h1>{session.user?.email}</h1>

            <button onClick={onSignOut}>Logout</button>
        </div>
    )
}
