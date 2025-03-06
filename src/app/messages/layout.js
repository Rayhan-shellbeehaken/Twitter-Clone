"use client"
import React, { useEffect, useMemo, useState } from 'react'
import styles from './page.module.css';
import { RiSettings3Line } from "react-icons/ri";
import { RiMailAddLine } from "react-icons/ri";
import SearchBox from '../components/searchbox/SearchBox';
import User from '../components/user/User';
import Link from 'next/link';
import MessageModal from '../components/messagemodal/MessageModal';
import axios from 'axios';
import { useSession } from 'next-auth/react';
import { usePathname } from 'next/navigation';

export default function MessagesLayout({children}) {
    const pathName = usePathname();
    const {data:session} = useSession();
    const [hideSection, setHideSection] = useState(false);
    const [chatList, setChatList] = useState([]);

    const { senderId, username } = useMemo(() => ({
        senderId: session?.user?._id,
        username: session?.user?.username
    }), [session]);
    
    async function fetchChatList() {
        try{
            const result = await axios.get('/api/messages');
            setChatList(result.data.chatList);
        }catch(error){
            console.log(error);
        }
    }

    useEffect(()=>{
        fetchChatList();
        function handleResize() {
            setHideSection(window.innerWidth <= 900);
        }
        handleResize();
        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    },[]);

    const isUserPage = /^\/messages\/\w+$/.test(pathName);
    return (
        <div className={styles.layout}>
            <MessageModal username={username}/>
            <div className={styles.line}></div>
            {!hideSection || !isUserPage ?
                <div className={styles.left}>
                    <div className={styles["message-bar"]}>
                        <div>Messages</div>
                        <div>
                            <div>
                                <RiSettings3Line/>
                            </div>
                            <div>
                                <RiMailAddLine/>
                            </div>
                        </div>
                    </div>
                    <div className={styles.searchBox}>
                        <SearchBox/>
                    </div>
                    {
                        chatList.map(list => (
                            <Link key={list.otherUserInfo._id} href={`/messages/${list.otherUserInfo._id}`}>
                                <User
                                    senderId={senderId}
                                    receiverId={list.otherUserInfo._id}
                                    image={list.otherUserInfo.profileImage}
                                    name={list.otherUserInfo.username}
                                    lastMessageTime={list.lastMessageCreatedAt}
                                    lastMessage={list.lastMessageText}
                                />
                            </Link>
                        ))
                    }
                </div> : null
            }
            
            <div className={styles.line}></div>
            {children}
            <div className={styles.line}></div>
        </div>
    )
}
