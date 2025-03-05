import React from 'react'
import { RiMoreFill } from "react-icons/ri";
import styles from './user.module.css'
import { formatDistanceToNow } from "date-fns";

export default function User({image,name,lastMessageTime,lastMessage}) {
    function timeAgo(date) {
        return formatDistanceToNow(new Date(date), { addSuffix: false });
    }
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
                        {name} <span> @_{name} . {timeAgo(lastMessageTime)}</span> 
                    </div>
                    <div>
                        {lastMessage}
                    </div>
                </div>
            </div>
            <div className={styles.right}>
                <RiMoreFill/>
            </div>
        </div>
    )
}
