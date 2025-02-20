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
import { GoXCircleFill } from "react-icons/go";
import axios from 'axios';
import { useAppContext } from '@/app/store/store';

export default function CommentPopUp({id,setShow,title,imageUrl,userDetails,commenters,userId}) {
    const textRef = useRef(null);
    const fileRef = useRef(null);
    const [commentText, setCommentText] = useState("");
    const [file,setFile] = useState("");
    const [commentImage,setCommentImage] = useState(null);
    const {toggleAlert} = useAppContext();

    useEffect(()=>{
        if(textRef.current){
            textRef.current.style.height = "45px";
            textRef.current.style.height = `${textRef.current.scrollHeight}px`;
        }
    },[commentText]);

    useEffect(()=>{
        if(file){
            const reader = new FileReader();
            reader.onloadend = () =>{
                setCommentImage(reader.result);
            }
            reader.readAsDataURL(file);
        }
    },[file]);

    const onComment = async(event) =>{
        event.preventDefault();
        commenters.push(userId);
        const data = {
            comment : {
                commentText,
                commentImage,
                userId
            }
        }
        
        try{
            const result = await axios.patch(`/api/tweets?id=${id}`,data);
            const notification = {
                notificationType : result.data.tweet.parent === null ? "comment" : "reply",
                notifiedTo : userDetails._id,
                redirectTo : `/${userDetails.username}/status/${id}`,
            };
            setShow(false);
            toggleAlert("success","Comment successfully");
            if(result.status === 200 && userId !== userDetails._id){
                const response = await axios.post('/api/notifications',notification);
            }
        }catch(error){
            toggleAlert("error","Failed to comment");
            console.log(error);
        }
    }

    const minimize = () =>{
        setFile("");
        setCommentImage(null);
    }

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
                        <button onClick={onComment} className={`${styles.button} ${styles["top-button"]}`} disabled={!commentText && !file}>Reply</button>
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
                            <p className={styles["first-account"]}><span>{userDetails.username}</span> @_{userDetails.username}</p>
                            <p className={styles["post-text"]}>{title}</p>
                            <p className={styles["post-text"]}>
                                {imageUrl ? 'www.image.com' : ''}
                            </p>
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

                <form onSubmit={onComment} className={styles.postbox}>
                    <div className={styles["postbox-first"]}>
                        <div className={styles["postbox-first-left"]}>
                            <Image src={xlogo} alt="xlogo" priority layout="intrinsic"/>
                        </div>
                        <div className={styles["postbox-first-right"]}>
                            <textarea placeholder='Post your reply' ref={textRef} value={commentText} onChange={(e)=>setCommentText(e.target.value)}/>
                            <input className={styles.input} type='file' ref={fileRef} onChange={(e)=>setFile(e.target.files[0])}></input>
                            {commentImage &&
                                <div className={styles["preview-image-container"]}>
                                    <div onClick={minimize} className={styles.minimize}>
                                        <GoXCircleFill/>
                                    </div>
                                    <img src={commentImage} className={styles["preview-image"]}></img>
                                </div>
                            }
                        </div>
                    </div>
                    <div className={styles["postbox-second"]}>
                        <div className={styles["postbox-second-left"]}>
                            <div onClick={()=>fileRef.current.click()}><IoImageOutline/></div>
                            <div><MdOutlineGifBox/></div>
                            <div><VscVscode/></div>
                            <div><BiPoll/></div>
                            <div><MdOutlineEmojiEmotions/></div>
                            <div><RiCalendarScheduleLine/></div>
                            <div><IoLocationOutline/></div>
                        </div>
                        <div className={styles["postbox-second-right"]}>
                            <button type='submit' className={`${styles.button} ${styles["bottom-button"]}`} disabled={!commentText && !file}>Reply</button>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    )
}
