import React from 'react'
import styles from './singlepost.module.css'
import { RiMoreFill } from "react-icons/ri";
import { LiaCommentAlt } from "react-icons/lia";

import { BiRepost } from "react-icons/bi";
import { CiHeart } from "react-icons/ci";
import { CgLoadbarSound } from "react-icons/cg";
import { PiBookmarkSimpleBold } from "react-icons/pi";
import { RiShare2Line } from "react-icons/ri";
import { IoIosStats } from "react-icons/io";
import xlogo from '../../../../public/images/xlogo.png';
import Image from 'next/image';

export default function SinglePost() {

    return (
        <div className={styles.container}>
            <div className={styles.left}>
                <Image src={xlogo} alt="xlogo" priority layout="intrinsic"/>
            </div>
            <div className={styles.right}>
                <div className={styles.user}>
                    <p>Shafikul Rahman<span> @_Rayhan66</span></p>
                    <RiMoreFill/>
                </div>
                <div className={styles["post-image"]}>
                    <Image src={xlogo} alt="xlogo" priority layout="intrinsic"/>
                </div>
                <div className={styles.elements}>
                    <p><LiaCommentAlt/> <span>33K</span></p>
                    <p><BiRepost/> <span>60K</span></p>
                    <p><CiHeart/> <span>1.5M</span></p>
                    <p><IoIosStats/> <span>10M</span></p>
                    <div>
                        <PiBookmarkSimpleBold/>
                        <RiShare2Line/>
                    </div>
                </div>
            </div>
        </div>
    )
}
