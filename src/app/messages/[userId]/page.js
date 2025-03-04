"use client"
import React from 'react'
import styles from './page.module.css';
import { PiInfoBold } from "react-icons/pi";
import { IoImageOutline } from "react-icons/io5";
import { MdOutlineGifBox } from "react-icons/md";
import { MdOutlineEmojiEmotions } from "react-icons/md";
import { LuSendHorizontal } from "react-icons/lu";
import { useState, useEffect, useRef } from 'react';
import { FiX } from "react-icons/fi";

export default function page() {
    // const {userId} = await params;
    const textRef = useRef(null);
    const fileRef = useRef(null);
    const containerRef = useRef(null);
    const [value, setValue] = useState("");
    const [file, setFile] = useState("");
    const [selectedImage, setSelectedImage] = useState(null);

    useEffect(()=>{
        if(textRef.current){
            textRef.current.style.height = "16px";
            textRef.current.style.height = `${textRef.current.scrollHeight}px`;
        }
    },[value]);

    useEffect(()=>{
        if(file){
            const reader = new FileReader();
            reader.onloadend = () =>{
                setSelectedImage(reader.result);
            }
            reader.readAsDataURL(file);
        }
    },[file]);

    const minimize = () =>{
        setFile("");
        setSelectedImage(null);
    }

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
                    <div className={`${styles.incoming} ${styles["not-last"]}`}>Hello</div>
                    <div className={`${styles.incoming}`}>Incoming</div>
                    <div className={`${styles.outgoing} ${styles["not-last"]}`}>Outgoing</div>
                    <div className={`${styles.outgoing}`}>Outgoing</div>
                </div>
            </div>
            
            <div className={styles.chatbox} ref={containerRef}>
                <div >
                    <div className={`${styles.icon} ${selectedImage ? styles.hidden : ''}`} onClick={()=>fileRef.current.click()}><IoImageOutline/></div>
                    <div className={`${styles.icon} ${selectedImage ? styles.hidden : ''}`}><MdOutlineGifBox/></div>
                    <div className={`${styles.icon} ${selectedImage ? styles.hidden : ''}`}><MdOutlineEmojiEmotions/></div>
                    <div className={styles.textarea}>
                        {selectedImage && 
                            <div className={styles["input-image"]}>
                                <img src={selectedImage}></img>
                                <div className={styles.cross} onClick={minimize}>
                                    <FiX/>
                                </div>
                            </div>
                        }
                        
                        <input type='file' ref={fileRef} className={styles.hidden} onChange={(e)=>setFile(e.target.files[0])}></input>
                        <textarea ref={textRef} value={value} onChange={(e)=>setValue(e.target.value)} placeholder='Start a new message'></textarea>
                    </div>
                    <div className={styles.icon}><LuSendHorizontal/></div>
                </div>
            </div>
        </div>
    )
}
