"use client"
import React, { useMemo } from 'react'
import styles from './page.module.css';
import { PiInfoBold } from "react-icons/pi";
import { IoImageOutline } from "react-icons/io5";
import { MdOutlineGifBox } from "react-icons/md";
import { MdOutlineEmojiEmotions } from "react-icons/md";
import { LuSendHorizontal } from "react-icons/lu";
import { useState, useEffect, useRef } from 'react';
import { FiX } from "react-icons/fi";
import { useParams } from 'next/navigation';
import axios from 'axios';
import { useSession } from 'next-auth/react';
import { io } from "socket.io-client";
import Link from 'next/link';

export default function page() {
    const socket = useMemo(()=>io("http://localhost:3000"),[]);  

    const {userId} = useParams();
    const {data:session} = useSession();
    const textRef = useRef(null);
    const fileRef = useRef(null);
    const containerRef = useRef(null);
    const [value, setValue] = useState("");
    const [file, setFile] = useState("");
    const [selectedImage, setSelectedImage] = useState(null);
    const [userInfo, setUserInfo] = useState(null);
    const [joinedDate, setJoinedDate] = useState(null);

    const [messages, setMessages] = useState([]);

    const senderId = useMemo(() => session?.user?._id, [session]);

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

    async function fetchUser() {
        const result = await axios.get(`/api/user?id=${userId}`);
        const user = result.data.user;
        console.log(user);
        setUserInfo(user);
        setJoinedDate(formatDate(user?.createdAt));
    }

    async function fetchMessages(senderId, userId) {
        const roomId = [senderId, userId].sort().join("-");
        try{
            const result = await axios.get(`/api/messages?roomId=${roomId}`);
            const messages = result.data.messages;
            setMessages(messages);
            console.log(messages);
        }catch(error){
            console.log(error);
        }
    }

    async function createRoom(senderId, userId) {
        const roomId = [senderId, userId].sort().join("-");
        const data = {
            roomId
        }
        try{
            const room = await axios.post('/api/messages',data);
        }catch(error){
            console.log(error);
        }
    }

    useEffect(()=>{
        fetchUser();
        if(!senderId || !userId) return;
        socket.emit('join-room',{
            senderId,
            receiverId : userId
        });
        createRoom(senderId,userId);
        fetchMessages(senderId,userId);
        return () => {
            socket.off("receive-message");
        };
    },[senderId, userId]);

    useEffect(()=>{
        socket.on("receive-message",({senderId, text})=>{
            setMessages((prev) => [...prev, { sender : senderId, text }]);
        })

        return () => {
            socket.off("receive-message");
        };
    },[]);

    function formatDate(dateString) {
        const date = new Date(dateString);
        const formattedMonth = new Intl.DateTimeFormat('en-US', { month: 'long' }).format(date);
        const year = date.getFullYear().toString().slice(-2);
      
        return `${formattedMonth} ${year}`;
    }
    
    const onSend = async() =>{
        const roomId = [senderId, userId].sort().join("-");
        const data = {
            roomId,
            text : value,
            messageImage : selectedImage
        }
        socket.emit("send-message",{
            senderId,
            receiverId : userId,
            text : value
        });
        try{
            const message = await axios.patch('/api/messages', data);
            setValue("");
            minimize();
        }catch(error){
            console.log(error);
        }
    }

    return (
        <div className={styles.page}>
            <div className={styles.head}>
                <div>{userInfo?.username || "Loading..."}</div>
                <div><PiInfoBold/></div>
            </div>
            <div className={styles.content}>
                <Link href={`/${userInfo?.username}?type=all`} className={styles.profile}>
                    <div className={styles.image}>
                        <img src={userInfo?.profileImage}></img>
                    </div>
                    <p>{userInfo?.username || "Loading..."}</p>
                    <p>@_{userInfo?.username || "Loading..."}</p>
                    <p>Joined {joinedDate} . {userInfo?.followers?.length || '0'} follower</p>
                </Link>
                <div className={styles.messages}>
                    {
                        messages.map((message,index) => (
                            message.sender === senderId ?
                            <div key={index} className={`${styles.outgoing}`}>{message.text}</div> :
                            <div key={index} className={`${styles.incoming}`}>{message.text}</div>
                        ))
                    }
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
                    
                    <button className={styles.icon} onClick={onSend}>
                        <LuSendHorizontal/>
                    </button>
                    
                </div>
            </div>
        </div>
    )
}
