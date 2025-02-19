"use client"
import React from 'react'
import styles from './notificationbar.module.css';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { TbSettings } from "react-icons/tb";

export default function NotificationBar() {
    const [active, setActive] = useState(1);
    const router = useRouter();

    const handleButtonClick = (event,value) =>{
        event.preventDefault();
        setActive(value);
        value===1 ? router.push(`?feed=foryou`) : router.push(`?feed=following`);
    }
    return (
        <div className={styles["nav-container"]}>
            <div className={styles.title}>
                <div>Notifications</div>
                <div><TbSettings/></div>
            </div>
            <form className={styles["nav-form"]}>
                <button className={`${styles.button} ${ active === 1 ? styles.active1 : ''}`} onClick={(event)=>handleButtonClick(event,1)}>All</button>
                <button className={`${styles.button} ${ active === 2 ? styles.active2 : ''}`} onClick={(event)=>handleButtonClick(event,2)}>Followed</button>
                <button className={`${styles.button} ${ active === 3 ? styles.active3 : ''}`} onClick={(event)=>handleButtonClick(event,3)}>Tweets</button>
            </form>
        </div>
    )
}
