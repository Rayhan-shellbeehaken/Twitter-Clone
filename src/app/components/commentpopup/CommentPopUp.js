"use client"
import React, { useState } from 'react'
import styles from './commentpopup.module.css';
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

export default function CommentPopUp({setShow}) {
    const textRef = useRef(null);
    const [postText, setPostText] = useState("");

    useEffect(()=>{
        if(textRef.current){
            // console.log("HEIGHT :: "+textRef.current.scrollHeight);
            textRef.current.style.height = "45px";
            textRef.current.style.height = `${textRef.current.scrollHeight}px`;
        }
    },[postText]);

    return (
        <div className={styles.container}>
            <div className={styles.popup}>
                <div className={styles.cross}>
                    <div>
                        <FiX className={styles["cross-icon"]} onClick={()=>setShow(false)}/>
                        <GoArrowLeft className={styles["back-icon"]} onClick={()=>setShow(false)}/>
                    </div>
                    
                    <div className={styles["cross-right"]}>
                        <p>Drafts</p>
                        <button className={`${styles.button} ${styles["top-button"]}`} disabled={!postText}>Reply</button>
                    </div>
                </div>

                <div className={styles.details}>
                    <div className={styles.first}>
                        <div className={styles["first-left"]}>
                            <div className={styles["first-image-container"]}>
                                <Image src={xlogo} alt="xlogo" priority layout="intrinsic"/>
                            </div>
                            <div className={styles["first-left-line"]}><hr/></div>
                        </div>
                        <div className={styles["first-right"]}>
                            <p className={styles["first-account"]}><span>Shafikul Rahman</span> @_Rayhan66 . 10h</p>
                            <p className={styles["post-text"]}>Delighted to meet my friend, President Macron in Paris. @EmmanuelMacron https://pic.x.com/ZxyziqUHGnhttps://pic.x.com/ZxyziqUHGn </p>
                        </div>
                    </div>
                    
                    <div className={styles.second}>
                        <div className={styles["second-left"]}>
                            <hr/>
                        </div>
                        <div className={styles["second-right"]}>
                            <p>Replying to <span>@_Rayhan66</span></p>
                        </div>
                    </div>
                </div>

                <form className={styles.postbox}>
                    <div className={styles["postbox-first"]}>
                        <div className={styles["postbox-first-left"]}>
                            <Image src={xlogo} alt="xlogo" priority layout="intrinsic"/>
                        </div>
                        <div className={styles["postbox-first-right"]}>
                            <textarea placeholder='Post your reply' ref={textRef} value={postText} onChange={(e)=>setPostText(e.target.value)}/>
                        </div>
                    </div>
                    <div className={styles["postbox-second"]}>
                        <div className={styles["postbox-second-left"]}>
                            <div><IoImageOutline/></div>
                            <div><MdOutlineGifBox/></div>
                            <div><VscVscode/></div>
                            <div><BiPoll/></div>
                            <div><MdOutlineEmojiEmotions/></div>
                            <div><RiCalendarScheduleLine/></div>
                            <div><IoLocationOutline/></div>
                        </div>
                        <div className={styles["postbox-second-right"]}>
                            <button className={`${styles.button} ${styles["bottom-button"]}`} disabled={!postText}>Reply</button>
                        </div>
                    </div>
                    
                </form>
            </div>
        </div>
    )
}
