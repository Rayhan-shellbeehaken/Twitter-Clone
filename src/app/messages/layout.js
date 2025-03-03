import React from 'react'
import styles from './page.module.css';
import { RiSettings3Line } from "react-icons/ri";
import { RiMailAddLine } from "react-icons/ri";
import SearchBox from '../components/searchbox/SearchBox';
import User from '../components/user/User';
import Link from 'next/link';
import MessageModal from '../components/messagemodal/MessageModal';
import { auth } from '@/auth';

export default async function MessagesLayout({children}) {
  const session = await auth();
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
            <Link href="/messages/1">
                <User/>
            </Link>
            <User/>
        </div>
        <div className={styles.line}></div>
        {children}
        <div className={styles.line}></div>
    </div>
  )
}
