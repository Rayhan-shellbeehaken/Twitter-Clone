"use client"
import React, { useEffect, useState } from 'react'
import Link from 'next/link'
import { FiMail } from "react-icons/fi";
import { IoMdMailUnread } from "react-icons/io";
import { getChatList } from '@/app/actions/chataction';
import styles from './sidemenu.module.css'

export default function MessageButton({userId}) {
    const [unread, setUnRead] = useState(false);

    async function fetchChatList() {
        try{
            const result = await getChatList();
            const chatList = result.data.chatList;

            const hasUnreadMessages = chatList.some(chat => 
                chat.status === "unseen" && chat.lastMessageSender !== userId
            );
            setUnRead(hasUnreadMessages);
        }catch(error){
            console.log(error);
        }
    }

    useEffect(()=>{
        fetchChatList();
    },[]);

    return (
        <li>
            <Link href="/messages" onClick={()=>setUnRead(false)}>
                {unread ? <IoMdMailUnread className={styles.unread}/> : <FiMail/>}
                <span>Messages</span>
            </Link>
        </li>
    )
}
