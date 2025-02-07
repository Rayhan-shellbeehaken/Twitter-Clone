import React from 'react'
import styles from './sidebarpopup.module.css';
import { doLogout } from '@/app/helpers/authentication';

export default function SideBarPopUp() {
    return (
        <form action={doLogout} className={styles.container}>
            <button>Add an existing account</button>
            <button type='submit'>Log out</button>
        </form>
    )
}
