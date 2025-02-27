"use client"
import React from 'react'
import styles from './profilenavbar.module.css';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

export default function ProfileNavBar({base,ownProfile}) {
    const [active, setActive] = useState(null);
    const router = useRouter();

    const activeNavOption = (value) =>{
        switch (value) {
            case "all":
                setActive(1);
                break;
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
        activeNavOption(base);
    },[]);

    const handleButtonClick = (event,value) =>{
        event.preventDefault();
        // setActive(value);
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
        router.push(newPath);
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

    const filteredButtonList = ownProfile ? buttonList
                             : buttonList.filter(button => button.key !== 4 && button.key !== 6);


    return (
        <div className={styles["nav-container"]}>
            <form className={styles["nav-form"]}>
                {
                    filteredButtonList.map(button => (
                        <button
                        key={button.key}
                        className={`${styles.button} 
                        ${active === button.key ? styles.active : ''}
                        ${!ownProfile ? styles["extra-padding"] : ''}
                        `}
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
