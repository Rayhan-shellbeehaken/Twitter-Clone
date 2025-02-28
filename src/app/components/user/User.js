import React from 'react'
import { RiMoreFill } from "react-icons/ri";
import styles from './user.module.css'

export default function User() {
  return (
    <div className={styles.container}>
        <div className={styles.left}>
            <div className={styles.image}>
                {/* Image */}
            </div>
            <div className={styles.info}>
                <div>
                    Username <span> @user_account . 1h</span> 
                </div>
                <div>
                    Hi
                </div>
            </div>
        </div>
        <div className={styles.right}>
            <RiMoreFill/>
        </div>
    </div>
  )
}
