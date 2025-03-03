"use client"
import React from 'react'
import styles from './page.module.css';
import { PiInfoBold } from "react-icons/pi";
import { IoImageOutline } from "react-icons/io5";
import { MdOutlineGifBox } from "react-icons/md";
import { MdOutlineEmojiEmotions } from "react-icons/md";
import { LuSendHorizontal } from "react-icons/lu";
import { useState, useEffect, useRef } from 'react';

export default function page() {
    // const {userId} = await params;
    const textRef = useRef(null);
    const containerRef = useRef(null);
    const [value, setValue] = useState("");

    useEffect(()=>{
        if(textRef.current){
            textRef.current.style.height = "20px";
            textRef.current.style.height = `${textRef.current.scrollHeight}px`;
            containerRef.current.style.height = `${textRef.current.scrollHeight + 20}px`;
        }
    },[value]);

    return (
        <div className={styles.page}>
            <div className={styles.head}>
                <div>User name</div>
                <div><PiInfoBold/></div>
            </div>
            <div className={styles.content}>
                <div className={styles.profile}>
                    <div className={styles.image}>

                    </div>
                    <p>User name</p>
                    <p>@_User account</p>
                    <p>Joined February 25 . 1 follower</p>
                </div>
                <div className={styles.messages}>

                </div>
            </div>
            
            <div className={styles.chatbox} ref={containerRef}>
                <div >
                    <div className={styles.icon}><IoImageOutline/></div>
                    <div className={styles.icon}><MdOutlineGifBox/></div>
                    <div className={styles.icon}><MdOutlineEmojiEmotions/></div>
                    <div className={styles.textarea}><textarea ref={textRef} value={value} onChange={(e)=>setValue(e.target.value)} placeholder='Start a new message'></textarea></div>
                    <div className={styles.icon}><LuSendHorizontal/></div>
                </div>
            </div>
        </div>
    )
}
