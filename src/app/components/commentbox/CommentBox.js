"use client"
import React from 'react'
import styles from './commentbox.module.css';
import { IoImageOutline } from "react-icons/io5";
import { MdOutlineGifBox } from "react-icons/md";
import { VscVscode } from "react-icons/vsc";
import { MdOutlineEmojiEmotions } from "react-icons/md";
import { IoLocationOutline } from "react-icons/io5";
import { GoXCircleFill } from "react-icons/go";
import xlogo from '../../../../public/images/xprofile.png';
import Image from 'next/image';
import { useRef, useState, useEffect } from 'react';
import { useSession } from 'next-auth/react';
import axios from 'axios';
import { useAppContext } from '@/app/store/store';

export default function CommentBox({tweet}) {
    const textRef = useRef(null);
    const fileRef = useRef(null);
    const [value, setValue] = useState("");
    const [file, setFile] = useState("");
    const [imagePreview, setImagePreview] = useState(null);
    const [userId, setUserId] = useState(null);
    const {toggleAlert} = useAppContext();

    const {data:session} = useSession();
    

    useEffect(()=>{
        setUserId(session?.user?._id);
    },[session?.user])

    useEffect(()=>{
        if(textRef.current){
            textRef.current.style.height = "45px";
            textRef.current.style.height = `${textRef.current.scrollHeight}px`;
        }
    },[value]);

    useEffect(()=>{
        if(file){
            const reader = new FileReader();
            reader.onloadend = () =>{
                setImagePreview(reader.result);
            }
            reader.readAsDataURL(file);
        }
    },[file]);

    const minimize = () =>{
        setFile("");
        setImagePreview(null);
    }

    const onComment = async(event) =>{
        event.preventDefault();
        const commenters = tweet.commenters;
        const newComment = {
            commentText : value,
            commentImage : imagePreview,
            userId : userId
        }
        commenters.push(newComment);
        const data = {
            commenters : commenters
        }
        try{
            const result = axios.patch(`/api/tweets?id=${tweet._id}`,data);
            toggleAlert("success","Comment successfully");
            setValue("");
            minimize();
        }catch(error){
            toggleAlert("error","Failed to comment");
            console.log(error);
        }
    }

    return (
        <div className={styles.commentbox}>
            <div className={styles.image}>
                <Image src={xlogo} alt="xlogo" priority layout="intrinsic"/>
            </div>
            <form onSubmit={onComment} className={styles.right}>
                <textarea ref={textRef} value={value} onChange={(e)=>setValue(e.target.value)} placeholder='What is happening?!'></textarea>
                <input type='file' ref={fileRef} onChange={(e)=>setFile(e.target.files[0])}></input>
                {imagePreview &&
                    <div className={styles["preview-image-container"]}>
                        <div className={styles.cross} onClick={minimize}>
                            <GoXCircleFill/>
                        </div>
                        <img src={imagePreview} className={styles["preview-image"]}></img>
                    </div>
                }
                <hr className={styles.divider}/>
                <div className={styles.attachment}>
                    <div className={styles["attachment-left"]}>
                        <div onClick={() => fileRef.current.click()}><IoImageOutline/></div>
                        <div><MdOutlineGifBox/></div>
                        <div><VscVscode/></div>
                        <div><MdOutlineEmojiEmotions/></div>
                        <div><IoLocationOutline/></div>
                    </div>
                    <div className={styles["attachment-right"]}>
                        <button type='submit' className={styles.button} disabled={!value && !file}>Reply</button>
                    </div>
                </div>
            </form>
        </div>
    )
}
