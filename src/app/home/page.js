import React from 'react';
import { auth } from '@/auth';
import { redirect } from 'next/navigation';
import { doLogout } from '@/app/helpers/authentication';
import styles from './page.module.css'

export default async function Home() {
    
    const session = await auth();

    if(!session?.user) redirect('/');

    console.log("Printing session.user");
    console.log(session?.user);

    return (
        <div className={styles.background}>
            {/* <h1>{session?.user?.email}</h1>
            <form action={doLogout}>
                <button type='submit'>Logout</button>
            </form> */}
        </div>
    )
}
