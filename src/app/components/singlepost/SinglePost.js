import React from 'react'
import styles from './singlepost.module.css'
import { RiMoreFill } from "react-icons/ri";
import { PiBookmarkSimpleBold } from "react-icons/pi";
import { RiShare2Line } from "react-icons/ri";
import { IoIosStats } from "react-icons/io";
import xlogo from '../../../../public/images/xprofile.png';
import Image from 'next/image';
import PostAction from '../postactions/PostAction';

export default function SinglePost({id,title,imageUrl,totalReact}) {

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
                <div className={styles.text}>
                    <p>{title}</p>
                </div>
                {imageUrl &&
                    <div className={styles["post-image"]}>
                        <Image src={imageUrl} width={100} height={100} alt="xlogo" priority layout="intrinsic"/>
                    </div>
                }
                
                <div className={styles.elements}>
                    <PostAction totalReact={totalReact} id={id}/>
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
