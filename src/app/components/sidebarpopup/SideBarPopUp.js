import React from 'react'
import styles from './sidebarpopup.module.css';

export default function SideBarPopUp() {
    return (
        <div className={styles.container}>
            <button>Add an existing account</button>
            <button>Log out</button>
        </div>
    )
}
