import React from 'react'
import styles from './commentpopup.module.css';
import { FiX } from "react-icons/fi";
import xlogo from '../../../../public/images/xprofile.png'
import Image from 'next/image';

export default function CommentPopUp({setShow}) {
    return (
        <div className={styles.container}>
            <div className={styles.popup}>
                <div className={styles.cross}>
                    <FiX className={styles["cross-icon"]} onClick={()=>setShow(false)}/>
                    <p>Drafts</p>
                </div>

                <div className={styles.details}>
                    <div className={styles.first}>
                        <div className={styles["first-left"]}>
                            <div className={styles["first-image-container"]}>
                                <Image src={xlogo} alt="xlogo" priority layout="intrinsic"/>
                            </div>
                            <div className={styles["first-left-line"]}><hr/></div>
                        </div>
                        <div className={styles["first-right"]}>
                            <p className={styles["first-account"]}><span>Shafikul Rahman</span> @_Rayhan66 . 10h</p>
                            <p className={styles["post-text"]}>Delighted to meet my friend, President Macron in Paris. @EmmanuelMacron https://pic.x.com/ZxyziqUHGnhttps://pic.x.com/ZxyziqUHGn </p>
                        </div>
                    </div>
                    
                    <div className={styles.second}>
                        <div className={styles["second-left"]}>
                            <hr/>
                        </div>
                        <div className={styles["second-right"]}>
                            <p>Replying to <span>@_Rayhan66</span></p>
                        </div>
                    </div>
                </div>

                <div className={styles.postbox}>
                    Post box
                </div>
            </div>
        </div>
    )
}
