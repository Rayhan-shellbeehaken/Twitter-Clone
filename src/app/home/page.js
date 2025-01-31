import React from 'react';
import { auth } from '@/auth';
import { redirect } from 'next/navigation';
import { doLogout } from '@/app/helpers/authentication';

export default async function Home() {
    
    const session = await auth();

    if(!session?.user) redirect('/');

    console.log("Printing session.user");
    console.log(session?.user);

    return (
        <div>
            <h1>{session?.user?.email}</h1>
            <form action={doLogout}>
                <button type='submit'>Logout</button>
            </form>
        </div>
    )
}
