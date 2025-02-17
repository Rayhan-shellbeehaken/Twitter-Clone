import React from 'react'
import styles from './singlepost.module.css'
import { RiMoreFill } from "react-icons/ri";
import { PiBookmarkSimpleBold } from "react-icons/pi";
import { RiShare2Line } from "react-icons/ri";
import { IoIosStats } from "react-icons/io";
import xlogo from '../../../../public/images/xprofile.png';
import Image from 'next/image';
import PostAction from '../postactions/PostAction';
import Link from 'next/link';

export default function SinglePost({id,title,imageUrl,reacters,userDetails,commenters,notclickable}) {
    const route = !notclickable ? `/${userDetails.username}/status/${id}` : undefined;
    const Content = notclickable ? 'div': Link;
    return (
        <div className={styles.container}>
            <div className={styles.left}>
                <Image src={xlogo} alt="xlogo" priority layout="intrinsic"/>
            </div>
            <div className={styles.right}>
                <div className={styles.user}>
                    <p>{userDetails.username}<span> @_{userDetails.username}</span></p>
                    <RiMoreFill/>
                </div>
                <Content href={route}>
                    <div className={styles.text}>
                        <p>{title}</p>
                    </div>
                    {imageUrl &&
                        <div className={styles["post-image"]}>
                            <Image src={imageUrl} width={100} height={100} alt="xlogo" priority layout="intrinsic"/>
                        </div>
                    }
                </Content>
                <div className={styles.elements}>
                    <PostAction 
                        reacters={reacters} 
                        id={id} 
                        title={title} 
                        imageUrl={imageUrl}
                        userDetails={userDetails}
                        commenters={commenters}
                    />
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
