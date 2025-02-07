"use client"
import React, { useState } from 'react'
import styles from './navbar.module.css';
import { useRouter } from 'next/navigation';

export default function Navbar() {
    const [active, setActive] = useState(1);
    const router = useRouter();

    const handleButtonClick = (event,value) =>{
        event.preventDefault();
        setActive(value);
        value===1 ? router.push(`?feed=foryou`) : router.push(`?feed=following`);
    }

    return (
        <div className={styles["nav-container"]}>
            <form className={styles["nav-form"]}>
                <button className={`${styles.button} ${ active === 1 ? styles.active1 : ''}`} onClick={(event)=>handleButtonClick(event,1)}>For you</button>
                <button className={`${styles.button} ${ active === 2 ? styles.active2 : ''}`} onClick={(event)=>handleButtonClick(event,2)}>Following</button>
            </form>
        </div>
    )
}
