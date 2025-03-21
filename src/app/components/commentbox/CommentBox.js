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
import { useRouter } from 'next/navigation';
import { getUserInfo } from '@/app/actions/useraction';
import { updateATweet } from '@/app/actions/tweetaction';
import { postANotification } from '@/app/actions/notificationaction';

export default function CommentBox({tweet}) {
    const textRef = useRef(null);
    const fileRef = useRef(null);
    const [value, setValue] = useState("");
    const [file, setFile] = useState("");
    const [imagePreview, setImagePreview] = useState(null);
    const [userId, setUserId] = useState(null);
    const {toggleAlert} = useAppContext();
    const router = useRouter();
    const [profileImage,setProfileImage] = useState("");

    const {data:session} = useSession();

    async function userInfo() {
        setUserId(session?.user?._id);
        const result = await getUserInfo(session?.user?.username);
        if(result) setProfileImage(result.user.profileImage);
    }

    useEffect(()=>{
        userInfo();
    },[session])

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
        const data = {
            comment : {
                commentText : value,
                commentImage : imagePreview,
                userId : userId
            }
        }
        try{
            const result = await updateATweet(tweet._id, data);
            const notification = {
                notificationType : result.data.tweet.parent === null ? "comment" : "reply",
                notifiedTo : tweet.user_details._id,
                redirectTo : `/${tweet.user_details.username}/status/${tweet._id}`
            };
            if(result.status === 200 && userId !== tweet.user_details._id){
                const response = await postANotification(notification);
            }
            router.refresh();
            
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
                {profileImage && 
                    <img src={profileImage}></img>
                }
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
