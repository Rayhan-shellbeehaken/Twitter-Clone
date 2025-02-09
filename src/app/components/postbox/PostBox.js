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
import xlogo from '../../../../public/images/xprofile.png';
import Image from 'next/image';
import axios from 'axios';
import { useAppContext } from '@/app/store/store';
import { useRouter } from 'next/navigation';

export default function PostBox() {
    const textRef = useRef(null);
    const fileRef = useRef(null);
    const [value, setValue] = useState("");
    const [file, setFile] = useState("");
    const {toggleAlert} = useAppContext();
    const [imagePreview, setImagePreview] = useState(null);
    const router = useRouter();

    useEffect(()=>{
        if(textRef.current){
            console.log("HEIGHT :: "+textRef.current.scrollHeight);
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
        const data = new FormData();
        data.append('postText',value);
        if(file){
            data.append('postImage',file);
        }
        try{
            const response = await axios.post('/api/tweets', data, {
                headers: {
                  'Content-Type': 'multipart/form-data',
                },
            });
            console.log(response.data);
            toggleAlert("success","Successfully posted");
            router.refresh();
            setValue("");
            minimize();
        }catch(error){
            console.log("Error in posting tweet");
            toggleAlert("error","Successfully posted");
            console.log(error);
        }
    }

    const minimize = () =>{
        setFile("");
        setImagePreview(null);
    }

    return (
        <div className={styles["postbox-container"]}>
            <div className={styles.image}>
                <Image src={xlogo} alt="xlogo" priority layout="intrinsic"/>
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
