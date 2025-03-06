"use client"
import React, { useState } from 'react'
import { RiMoreFill } from "react-icons/ri";
import styles from './user.module.css'
import { formatDistanceToNow } from "date-fns";
import { useEffect } from 'react';
import { useMemo } from 'react';
import { io } from "socket.io-client";

export default function User({senderId,receiverId,image,name,lastMessageTime,lastMessage}) {

    const socket = useMemo(()=>io("http://localhost:3000"),[]);  
    const [latestMessage, setLatestMessage] = useState({message : lastMessage, time : lastMessageTime});
    function timeAgo(date) {
        return formatDistanceToNow(new Date(date), { addSuffix: false });
    }

    useEffect(()=>{
        socket.emit('join-room',{
            senderId,
            receiverId
        });
        return () => {
            socket.off("receive-message");
        };
    },[senderId,receiverId]);

    useEffect(()=>{
        socket.on("receive-message",({senderId, text})=>{
            setLatestMessage({message : text , time : Date.now()});
        })
        return () => {
            socket.off("receive-message");
        };
    },[]);

    return (
        <div className={styles.container}>
            <div className={styles.left}>
                <div className={styles.image}>
                    {image && 
                        <img src={image}></img>
                    }
                </div>
                <div className={styles.info}>
                    <div>
                        {name} <span> @_{name} . {timeAgo(latestMessage.time)}</span> 
                    </div>
                    <div>
                        {latestMessage.message}
                    </div>
                </div>
            </div>
            <div className={styles.right}>
                <RiMoreFill/>
            </div>
        </div>
    )
}
