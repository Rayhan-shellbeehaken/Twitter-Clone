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
import { BiRepost } from "react-icons/bi";
import { auth } from '@/auth';

export default async function SinglePost({
    id, title,
    imageUrl, reacters,
    userDetails, commenters,
    notclickable, reposted_details
}) {
    const route = !notclickable ? `/${userDetails.username}/status/${id}` : undefined;
    const Content = notclickable ? 'div': Link;

    const session = await auth();

    const reposted = (!title && !imageUrl && reposted_details) ? true : false;
    
    const tweet_info = {
        id : reposted ? reposted_details._id : id,
        title : reposted ? reposted_details.postText : title,
        imageUrl : reposted ? reposted_details.postImage : imageUrl,
        reacters : reposted ? reposted_details.reacters : reacters,
        commenters : reposted ? reposted_details.commenters : commenters,
        userDetails : reposted ? reposted_details.user_details : userDetails
    }
    
    const reposter = (reposted && (userDetails._id === session?.user?._id)) ? "You" : userDetails.username;
    
    return (
        <div className={styles["single-post-container"]}>
            {reposted && 
                <div className={styles["repost-info"]}>
                    <BiRepost/>
                    <p>{reposter} reposted</p>
                </div>
            }
            
            <div className={styles.container}>
                <div className={styles.left}>
                    <Image src={xlogo} alt="xlogo" priority layout="intrinsic"/>
                </div>
                <div className={styles.right}>
                    <div className={styles.user}>                   
                        <p>{tweet_info.userDetails.username}<span> @_{tweet_info.userDetails.username}</span></p>
                        <RiMoreFill/>
                    </div>
                    <Content href={route}>
                        <div className={styles.text}>
                            <p>{tweet_info.title}</p>
                        </div>
                        {imageUrl &&
                            <div className={styles["post-image"]}>
                                <Image src={tweet_info.imageUrl} width={100} height={100} alt="xlogo" priority layout="intrinsic"/>
                            </div>
                        }
                    </Content>
                    <div className={styles.elements}>
                        <PostAction 
                            reacters={tweet_info.reacters} 
                            id={tweet_info.id} 
                            title={tweet_info.title} 
                            imageUrl={tweet_info.imageUrl}
                            userDetails={tweet_info.userDetails}
                            commenters={tweet_info.commenters}
                        />
                        <p><IoIosStats/> <span>10M</span></p>
                        <div>
                            <PiBookmarkSimpleBold/>
                            <RiShare2Line/>
                        </div>
                        
                    </div>
                </div>
            </div>
        </div>
    )
}
