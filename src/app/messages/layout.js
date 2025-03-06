import React from 'react'
import styles from './page.module.css';
import { RiSettings3Line } from "react-icons/ri";
import { RiMailAddLine } from "react-icons/ri";
import SearchBox from '../components/searchbox/SearchBox';
import User from '../components/user/User';
import Link from 'next/link';
import MessageModal from '../components/messagemodal/MessageModal';
import { auth } from '@/auth';
import { getChatList } from '../helpers/chatList';

export default async function MessagesLayout({children}) {
  const session = await auth();
  const result = await getChatList();
  const chatList = result.chatList;
  return (
    <div className={styles.layout}>
        <MessageModal username={session?.user?.username}/>
        <div className={styles.line}></div>
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
                            senderId={session?.user?._id}
                            receiverId={list.otherUserInfo._id}
                            image={list.otherUserInfo.profileImage}
                            name={list.otherUserInfo.username}
                            lastMessageTime={list.lastMessageCreatedAt}
                            lastMessage={list.lastMessageText}
                        />
                    </Link>
                ))
            }
        </div>
        <div className={styles.line}></div>
        {children}
        <div className={styles.line}></div>
    </div>
  )
}
