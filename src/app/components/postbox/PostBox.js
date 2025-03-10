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
import { GoXCircleFill } from "react-icons/go";
import axios from 'axios';
import { useAppContext } from '@/app/store/store';
import { useRouter } from 'next/navigation';
import { postATweet } from '@/app/actions/tweetaction';
import { getUserInfo } from '@/app/actions/useraction';

export default function PostBox({username}) {
    const textRef = useRef(null);
    const fileRef = useRef(null);
    const [value, setValue] = useState("");
    const [file, setFile] = useState("");
    const {toggleAlert} = useAppContext();
    const [imagePreview, setImagePreview] = useState(null);
    const router = useRouter();
    const [userInfo, setUserInfo] = useState({name : '' , profileImage : ''});

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

    const handleSubmit = async(event) =>{
        event.preventDefault();
        let postImage = null;
        if(file) postImage = imagePreview; 
        const data = {
            postText : value,
            postImage
        }
        try{
            const response = await postATweet(data);
            toggleAlert("success","Successfully posted");
            router.refresh();
            setValue("");
            minimize();
        }catch(error){
            toggleAlert("error","Failed to post");
            console.log(error);
        }
    }

    const minimize = () =>{
        setFile("");
        setImagePreview(null);
    }

    async function fetchData() {
        const user = await getUserInfo(username);
        setUserInfo({name : user.user.username , profileImage : user.user.profileImage});
    }

    useEffect(()=>{
        fetchData();
    },[])

    return (
        <div className={styles["postbox-container"]}>
            <div className={styles.image}>
                {userInfo.profileImage !== '' &&
                    <img src={userInfo.profileImage}></img>
                }
                {/* <img src={xlogo} alt="xlogo"/> */}
            </div>
            <form onSubmit={handleSubmit} className={styles.right}>
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
                <p> <FaEarthAmericas/> <span>Everyone can reply</span></p>
                <hr className={styles.divider}/>
                <div className={styles.attachment}>
                    <div className={styles["attachment-left"]}>
                        <div onClick={() => fileRef.current.click()}><IoImageOutline/></div>
                        <div><MdOutlineGifBox/></div>
                        <div><VscVscode/></div>
                        <div><BiPoll className={styles.poll}/></div>
                        <div><MdOutlineEmojiEmotions/></div>
                        <div><RiCalendarScheduleLine/></div>
                        <div><IoLocationOutline/></div>
                    </div>
                    <div className={styles["attachment-right"]}>
                        <button type='submit' className={styles.button} disabled={!value && !file}>Post</button>
                    </div>
                </div>
            </form>
        </div>
    )
}
