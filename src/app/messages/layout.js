import React from 'react'
import styles from './page.module.css';
import { RiSettings3Line } from "react-icons/ri";
import { RiMailAddLine } from "react-icons/ri";
import SearchBox from '../components/searchbox/SearchBox';
import User from '../components/user/User';

export default function MessagesLayout({children}) {
  return (
    <div className={styles.layout}>
        <div className={styles.line}>
        </div>
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
            <User/>
        </div>
        <div className={styles.line}>
        </div>
        {children}
    </div>
  )
}
