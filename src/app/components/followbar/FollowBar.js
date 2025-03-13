"use client"
import React, { useEffect } from 'react'
import styles from './followbar.module.css';
import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function FollowBar({queryParams}) {
    const [active, setActive] = useState(null);
    const router = useRouter();
    const buttonList = [
        {key : 1, name :"Follower"},
        {key : 2, name : "Following"}
    ];
    const handleButtonClick = (event,value) =>{
        event.preventDefault();
        let newPath = `?type=${queryParams}`;
        switch (value) {
            case 1:
                newPath = `?type=follower`
                break;
            case 2:
                newPath = `?type=following`
                break;
            default:
                break;
        }
        router.push(newPath);
        setActive(value);
    }
    useEffect(()=>{
        switch (queryParams) {
            case "follower":
                setActive(1);
                break;
            case "following":
                setActive(2)
                break;
            default:
                break;
        }
    },[]);
    
    return (
        <div className={styles["nav-container"]}>
            <form className={styles["nav-form"]}>
                {
                    buttonList.map((list)=>(
                        <button
                         key={list.key}
                         className={`${styles.button}
                         ${active === list.key ? styles.active : ''}`}
                         onClick={(event)=>handleButtonClick(event,list.key)}
                         >
                            {list.name}
                        </button>
                    ))
                } 
            </form>
        </div>
    )
}
