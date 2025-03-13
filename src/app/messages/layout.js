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
import Loader from '../components/loader/Loader';
import { getChatList } from '../actions/chataction';

export default function MessagesLayout({children}) {
    const pathName = usePathname();
    const {data:session,status} = useSession();
    const [hideSection, setHideSection] = useState(false);
    const [chatList, setChatList] = useState([]);
    const [info, setInfo] = useState({senderId : '', username : ''});
    const [searchTerm, setSearchTerm] = useState("");

    useEffect(()=>{
        if(!session?.user) return;
        setInfo({senderId : session?.user?._id, username : session?.user?.username});
    },[session]);

    const filteredChatList = chatList?.filter(list =>
        list.otherUserInfo.username.toLowerCase().includes(searchTerm.toLowerCase())
    );
    
    async function fetchChatList() {
        try{
            const result = await getChatList();
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
    const urlId = pathName.split("/")[2];

    if(status === "loading"){
        return <div className={styles.blank}><Loader/></div>
    }
    
    return (
        status !== "loading" &&
        <div className={styles.layout}>
            <MessageModal username={session?.user?.username}/>
            <div className={styles.line}></div>
            
            <div className={`${styles.left} ${(!hideSection || !isUserPage) ? '' : styles.hide}`} >
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
                    <SearchBox searchTerm={searchTerm} setSearchTerm={setSearchTerm}/>
                </div>
                {filteredChatList.length > 0 ?
                    filteredChatList.map(list => (
                        <Link key={list.otherUserInfo._id} href={`/messages/${list.otherUserInfo._id}`}>
                            <User
                                isActive={urlId === list.otherUserInfo._id}
                                senderId={session?.user?._id}
                                receiverId={list.otherUserInfo._id}
                                image={list.otherUserInfo.profileImage}
                                name={list.otherUserInfo.username}
                                lastMessageTime={list.lastMessageCreatedAt}
                                lastMessage={list.lastMessageText}
                                lastMessageSender={list.lastMessageSender}
                                seenStatus={list.status}
                            />
                        </Link>
                    )) : null
                }
            </div>
            
            
            <div className={styles.line}></div>
            {children}
            <div className={styles.line}></div>
        </div>
    )
}
