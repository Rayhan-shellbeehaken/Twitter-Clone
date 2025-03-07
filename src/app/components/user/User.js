"use client"
import React, { useState } from 'react'
import { RiMoreFill } from "react-icons/ri";
import styles from './user.module.css'
import { formatDistanceToNow } from "date-fns";
import { useEffect } from 'react';
import { useMemo } from 'react';
import { io } from "socket.io-client";

export default function User({isActive,senderId,receiverId,image,name,lastMessageTime,lastMessage}) {
    const socket = useMemo(()=>io("http://localhost:3000"),[]);  
    const [latestMessage, setLatestMessage] = useState({message : lastMessage, time : lastMessageTime});
    function timeAgo(date) {
        return formatDistanceToNow(new Date(date), { addSuffix: false });
    }
    useEffect(()=>{
        socket.emit('join-chat',{
            senderId,
            receiverId
        });
        return () => {
            // socket.off("receive");
            socket.disconnect();
        };
    },[senderId,receiverId]);

    useEffect(()=>{
        socket.on("receive",({senderId, text})=>{
            setLatestMessage({message : text , time : Date.now()});
        })
        return () => {
            // socket.off("receive");
        };
    },[]);

    return (
        <div className={`${styles.container} ${isActive ? styles.active : ''}`}>
            <div className={styles.left}>
                <div className={styles.image}>
                    {image && 
                        <img src={image}></img>
                    }
                </div>
                <div className={styles.info}>
                    <div>
                        {name} <span> @_{name} . {latestMessage.time ? timeAgo(latestMessage.time) : ''}</span> 
                    </div>
                    <div>
                        {latestMessage.message || "Image"}
                    </div>
                </div>
            </div>
            <div className={styles.right}>
                <RiMoreFill/>
            </div>
        </div>
    )
}
