"use client"
import React, { useEffect, useState, useRef } from 'react'
import styles from './postbox.module.css';
import { FaEarthAmericas } from "react-icons/fa6";
import { IoImageOutline } from "react-icons/io5";
import { MdOutlineGifBox } from "react-icons/md";
import { VscVscode } from "react-icons/vsc";
import { BiPoll } from "react-icons/bi";
import { MdOutlineEmojiEmotions } from "react-icons/md";
import { RiCalendarScheduleLine } from "react-icons/ri";
import { IoLocationOutline } from "react-icons/io5";
import xlogo from '../../../../public/images/xprofile.png';
import Image from 'next/image';
import axios from 'axios';
import { useAppContext } from '@/app/store/store';

export default function PostBox() {
    const textRef = useRef(null);
    const [value, setValue] = useState("");
    const {toggleAlert} = useAppContext();

    useEffect(()=>{
        if(textRef.current){
            console.log("HEIGHT :: "+textRef.current.scrollHeight);
            textRef.current.style.height = "45px";
            textRef.current.style.height = `${textRef.current.scrollHeight}px`;
        }
    },[value]);

    const handleSubmit = async(event) =>{
        event.preventDefault();
        const data = new FormData();
        data.append('postText',value);
        try{
            const response = await fetch('/api/tweets', {
                method: 'POST',
                body: data
            });
            const result = await response.json();
            console.log(result);
            toggleAlert("SUCCESS","Successfully posted");
            setValue("");
        }catch(error){
            console.log("Error in posting tweet");
            console.log(error);
        }
    }

    return (
        <div className={styles["postbox-container"]}>
            <div className={styles.image}>
                <Image src={xlogo} alt="xlogo" priority layout="intrinsic"/>
            </div>
            <form onSubmit={handleSubmit} className={styles.right}>
                <textarea ref={textRef} value={value} onChange={(e)=>setValue(e.target.value)} placeholder='What is happening?!' required></textarea>
                <p> <FaEarthAmericas/> <span>Everyone can reply</span></p>
                <hr className={styles.divider}/>
                <div className={styles.attachment}>
                    <div className={styles["attachment-left"]}>
                        <div><IoImageOutline/></div>
                        <div><MdOutlineGifBox/></div>
                        <div><VscVscode/></div>
                        <div><BiPoll className={styles.poll}/></div>
                        <div><MdOutlineEmojiEmotions/></div>
                        <div><RiCalendarScheduleLine/></div>
                        <div><IoLocationOutline/></div>
                    </div>
                    <div className={styles["attachment-right"]}>
                        <button type='submit' className={styles.button} disabled={!value}>Post</button>
                    </div>
                </div>
            </form>
        </div>
    )
}
