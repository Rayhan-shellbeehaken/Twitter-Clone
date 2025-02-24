"use client"
import React from 'react'
import styles from './profilenavbar.module.css';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

export default function ProfileNavBar({base}) {
    const [active, setActive] = useState(1);
    const router = useRouter();

    const activeNavOption = (value) =>{
        switch (value) {
            case "with_replies":
                setActive(2);
                break;
            case "highlights":
                setActive(3);
                break;
            case "articles":
                setActive(4);
                break;
            case "media":
                setActive(5);
                break;
            case "likes":
                setActive(6);
                break;
            default:
                break;
        }
    }

    useEffect(()=>{
        const pathParts = window.location.pathname.split("/")[2];
        activeNavOption(pathParts);
    },[router.asPath]);

    const handleButtonClick = (event,value) =>{
        event.preventDefault();
        setActive(value);
        let newPath = `?type=all`;
        switch (value) {
            case 2:
                newPath = `?type=with_replies`
                break;
            case 3:
                newPath = `?type=highlights`
                break;
            case 4:
                newPath = `?type=articles`
                break;
            case 5:
                newPath = `?type=media`
                break;
            case 6:
                newPath = `?type=likes`
                break;
            default:
                break;
        }
        router.push(newPath, undefined, {shallow : true});
        setActive(value);
    }

    const buttonList = [
        {key: 1, name : "Posts"},
        {key: 2, name : "Replies"},
        {key: 3, name : "Highlights"},
        {key: 4, name : "Articles"},
        {key: 5, name : "Media"},
        {key: 6, name : "Likes"},

    ];

    return (
        <div className={styles["nav-container"]}>
            <form className={styles["nav-form"]}>
                {
                    buttonList.map(button => (
                        <button
                        key={button.key}
                        className={`${styles.button} ${active === button.key ? styles.active : ''}`}
                        onClick={(event)=>handleButtonClick(event,button.key)}
                        >
                            {button.name}
                        </button>
                    ))
                }
            </form>
        </div>
    )
}
