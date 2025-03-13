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
import { FaArrowLeft } from "react-icons/fa6";
import { getYearAndMonth } from '@/app/helpers/birthdate';
import { getUserInfoById } from '@/app/actions/useraction';
import { addARoom, addMessage, getMessages, updateMessage, updateMessageStatus } from '@/app/actions/chataction';

export default function page() {
    const socket = useMemo(()=>io("http://localhost:3000"),[]);  

    const {userId} = useParams();
    const {data:session, status} = useSession();
    const textRef = useRef(null);
    const fileRef = useRef(null);
    const contentRef = useRef(null);
    const containerRef = useRef(null);
    const [value, setValue] = useState("");
    const [file, setFile] = useState("");
    const [selectedImage, setSelectedImage] = useState(null);
    const [userInfo, setUserInfo] = useState(null);
    const [joinedDate, setJoinedDate] = useState(null);
    const [messages, setMessages] = useState([]);
    const senderId = useMemo(() => session?.user?._id, [session]);
    const [messageStatus, setMessageStatus] = useState("unseen");

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
        // const result = await axios.get(`/api/user?id=${userId}`);
        const result = await getUserInfoById(userId);
        const user = result.data.user;
        setUserInfo(user);
        setJoinedDate(getYearAndMonth(user?.createdAt));
    }

    async function fetchMessages(senderId, userId) {
        const roomId = [senderId, userId].sort().join("-");
        try{
            const result = await getMessages(roomId);
            const messages = result.data.messages.messages;
            setMessages(messages);
            setMessageStatus(result.data.messages.status);
        }catch(error){
            console.log(error);
        }
    }

    async function createRoom(senderId, userId) {
        const roomId = [senderId, userId].sort().join("-");
        const data = {
            roomId
        }
        const room = await addARoom(data);
    }

    async function onChangeStatus(value) {
        const roomId = [senderId, userId].sort().join("-");
        const data = {
            roomId,
            status: value ? value : messageStatus
        }
        const message = await updateMessageStatus(data);
    }

    useEffect(()=>{
        fetchUser();
        if(!senderId || !userId ) return;
        socket.emit('join-room',{
            senderId,
            receiverId : userId
        });
        createRoom(senderId,userId);
        fetchMessages(senderId,userId);
        return () => {
            socket.off("receive-message");
            socket.disconnect();
        };
    },[senderId,userId]);

    useEffect(()=>{
        if(messages.length !== 0){
            const lastTexterId = messages[messages.length - 1].sender;
            if(lastTexterId !== senderId){
                onChangeStatus("seen")
            }else onChangeStatus();
            
        }
    },[messageStatus])

    useEffect(()=>{
        socket.on("join-receiver",({receiverId})=>{
            if(receiverId === userId) setMessageStatus("seen"); // ekhane change
            onChangeStatus("seen");
        })
        socket.on("receive-message",({senderId, text, image, status})=>{
            setMessages((prev) => [...prev, { sender : senderId, text, messageImage : image }]);
            setMessageStatus(status);
        })

        return () => {
            socket.off("join-reciever");
            socket.off("receive-message");
        };
    },[]);

    useEffect(()=>{
        if (contentRef.current) {
            contentRef.current.scrollTop = contentRef.current.scrollHeight;
        }
    },[messages]);
    
    const onSend = async() =>{
        const roomId = [senderId, userId].sort().join("-");
        if(value === "" && selectedImage === null) return;
        const data = {
            roomId,
            text : value,
            messageImage : selectedImage
        }
        socket.emit("send-message",{
            senderId,
            receiverId : userId,
            text : value,
            image : selectedImage
        });
        textRef.current.focus();
        const message = await addMessage(data);
        setValue("");
        minimize();
    }

    return (
        <div className={styles.page}>
            <div className={styles.head}>
                <div>
                    <Link href={`/messages`} className={styles.back}><FaArrowLeft/></Link>
                    {userInfo?.username || "Loading..."}
                </div>
                <div><PiInfoBold/></div>
            </div>
            <div ref={contentRef} className={styles.content}>
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
                        messages.map((message, index) => {
                            const isLastMessage = index === messages.length - 1;
                        
                            return (
                                message.sender === senderId ?     
                                <div key={index} className={`${styles.outgoing}`}>
                                    {message.messageImage && 
                                        <div className={styles.chatImage}>
                                            <img src={message.messageImage}></img>
                                        </div>
                                    }
                                    {message.text &&
                                        <div className={styles["outgoing-text"]}>
                                            {message.text}
                                        </div>
                                    }
                                    {isLastMessage &&
                                        <p className={styles["message-status"]}>{messageStatus}</p>
                                    }
                                </div> 
                                :
                                <div key={index} className={`${styles.incoming} ${isLastMessage ? styles.lastMessage : ""}`}>
                                    {message.messageImage && 
                                        <div className={styles.chatImage}>
                                            <img src={message.messageImage}></img>
                                        </div>
                                    }
                                    {message.text &&
                                        <div className={styles["incoming-text"]}>{message.text}</div>
                                    }
                                </div>
                            );
                        })
                        
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
