import React from 'react'
import styles from './profilemodal.module.css';
import { FiX } from "react-icons/fi";

export default function ProfileModal() {
    return (
        <div className={styles.container}>
            <div className={styles.modal}>
                <div className={styles.head}>
                    <div className={styles["head-left"]}>
                        <div>
                            <FiX className={styles.cross}/>
                        </div>
                        <div>
                            Edit profile
                        </div>
                    </div>
                    <button className={styles["head-right"]}>
                        Save
                    </button>
                </div>
            </div>
        </div>
    )
}
