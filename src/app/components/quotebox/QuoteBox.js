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
import ReTweet from '../retweet/ReTweet';
import { FaEarthAmericas } from "react-icons/fa6";
import { useAppContext } from '@/app/store/store';
import { useRouter } from 'next/navigation';
import { useSession } from 'next-auth/react';

export default function QuoteBox({id,setQuotePopUp,userDetails,title,imageUrl,createdAt}) {
    const textRef = useRef(null);
    const fileRef = useRef(null);
    const [postText, setPostText] = useState("");
    const [postImage, setPostImage] = useState(null);
    const [file, setFile] = useState("");
    const {toggleAlert} = useAppContext();
    const router = useRouter();
    const {data:session} = useSession();

    useEffect(()=>{
        if(textRef.current){
            textRef.current.style.height = "45px";
            textRef.current.style.height = `${textRef.current.scrollHeight}px`;
        }
    },[postText]);

    useEffect(()=>{
        if(file){
            const reader = new FileReader();
            reader.onloadend = () =>{
                setPostImage(reader.result);
            }
            reader.readAsDataURL(file);
        }
    },[file]);

    const minimize = () =>{
        setFile("");
        setPostImage(null);
    }

    const onRepost = async() => {
        const data = {
            postText,
            postImage,
            repostedTweet : id
        }  
        try{
            const response = await axios.post('/api/tweets',data);
            if(response.status === 200 && session?.user?._id !== userDetails._id){
                const notification = {
                    notificationType : "repost",
                    notifiedTo: userDetails._id,
                    redirectTo: `/${userDetails.username}/status/${response.data.tweet._id}`
    
                }
                const result = await axios.post('/api/notifications',notification);
            }
            toggleAlert("success","Successfully posted");
            setQuotePopUp(false);
            router.refresh();
        }catch(error){
            toggleAlert("error","Failed to post");
            console.log(error);
        }
    }

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
                        <input className={styles.input} type='file' ref={fileRef} onChange={(e)=>setFile(e.target.files[0])}></input>
                        {postImage &&
                            <div className={styles["preview-image-container"]}>
                                <div onClick={minimize} className={styles.minimize}>
                                    <GoXCircleFill/>
                                </div>
                                <img src={postImage} className={styles["preview-image"]}></img>
                            </div>
                        }
                        <ReTweet 
                            id={id}
                            userDetails={userDetails}
                            title={title}
                            imageUrl={imageUrl}
                            createdAt={createdAt}
                        />
                    </div>
                </div>
                <div className={styles.filter}>
                    <FaEarthAmericas/>
                    <p>Everyone can reply</p>
                </div>
                <hr/>
                <div className={styles.submission}>
                    <div className={styles["submission-left"]}>
                        <div><IoImageOutline onClick={()=>fileRef.current.click()}/></div>
                        <div><MdOutlineGifBox/></div>
                        <div><VscVscode/></div>
                        <div><BiPoll/></div>
                        <div><MdOutlineEmojiEmotions/></div>
                        <div><RiCalendarScheduleLine/></div>
                        <div><IoLocationOutline/></div>
                    </div>
                    <div className={styles["submission-right"]}>
                        <button
                        onClick={onRepost}
                        className={`${styles.button} ${styles["bottom-button"]}`} 
                        disabled={!file && !postText}>
                            Reply
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}
