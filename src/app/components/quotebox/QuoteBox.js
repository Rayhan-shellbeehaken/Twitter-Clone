"use client"
import React, { useState } from 'react'
import styles from './quotebox.module.css';
import { FiX } from "react-icons/fi";
import xlogo from '../../../../public/images/xprofile.png'
import Image from 'next/image';
import { useRef, useEffect } from 'react';
import { IoImageOutline } from "react-icons/io5";
import { MdOutlineGifBox } from "react-icons/md";
import { VscVscode } from "react-icons/vsc";
import { BiPoll } from "react-icons/bi";
import { MdOutlineEmojiEmotions } from "react-icons/md";
import { RiCalendarScheduleLine } from "react-icons/ri";
import { IoLocationOutline } from "react-icons/io5";
import { GoArrowLeft } from "react-icons/go";
import { GoXCircleFill } from "react-icons/go";
import axios from 'axios';

export default function QuoteBox({setQuotePopUp}) {
    const textRef = useRef(null);
    const [postText, setPostText] = useState("");

    useEffect(()=>{
        if(textRef.current){
            textRef.current.style.height = "45px";
            textRef.current.style.height = `${textRef.current.scrollHeight}px`;
        }
    },[postText]);

    return (
        <div className={styles.container}>
            <div className={styles.popup}>
                <div className={styles.cross}>
                    <div>
                        <FiX className={styles["cross-icon"]} onClick={() => setQuotePopUp(false)}/>
                        <GoArrowLeft className={styles["back-icon"]} onClick={() => setQuotePopUp(false)}/>
                    </div>
                    
                    <div className={styles["cross-right"]}>
                        <p>Drafts</p>
                        <button className={`${styles.button} ${styles["top-button"]}`}>Reply</button>
                    </div>
                </div>
                <div className={styles["quote-container"]}>
                    <div className={styles.left}>
                        <Image src={xlogo} alt="xlogo" priority layout="intrinsic"/>
                    </div>
                    <div className={styles.right}>
                        <textarea placeholder='Add a comment' ref={textRef} value={postText} onChange={(e)=>setPostText(e.target.value)}></textarea>
                        
                    </div>
                </div>
            </div>
        </div>
    )
}
