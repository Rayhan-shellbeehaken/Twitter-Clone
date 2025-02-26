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
import ReTweet from '../retweet/ReTweet';
import { formatDistanceToNow } from "date-fns";

export default async function SinglePost({
    id, title,
    imageUrl, reacters,
    userDetails, commenters, reposters,
    notclickable, reposted_details,
    createdAt
}) {

    const session = await auth();
    const reposted = (!title && !imageUrl && JSON.stringify(reposted_details) !== "{}") ? true : false; //can be modified
    const withQuote = ((title || imageUrl) && JSON.stringify(reposted_details) !== "{}") ? true : false;
    
    function timeAgo(date) {
        return formatDistanceToNow(new Date(date), { addSuffix: true });
    }

    const tweet_info = {
        id : reposted ? reposted_details._id : id,
        title : reposted ? reposted_details.postText : title,
        imageUrl : reposted ? reposted_details.postImage : imageUrl,
        reacters : reposted ? reposted_details.reacters : reacters,
        commenters : reposted ? reposted_details.commenters : commenters,
        userDetails : reposted ? reposted_details.user_details : userDetails,
        reposters : reposted ? reposted_details.reposters : reposters
    }

    const route = !notclickable ? `/${tweet_info.userDetails.username}/status/${tweet_info.id}` : undefined;
    const Content = notclickable ? 'div': Link;
    
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
                    <img src={tweet_info.userDetails.profileImage}></img>
                    {/* <Image src={xlogo} alt="xlogo" priority layout="intrinsic"/> */}
                </div>
                <div className={styles.right}>
                    <div className={styles.user}>                   
                        <p>
                            {tweet_info.userDetails.username}<span> . @_{tweet_info.userDetails.username}</span> <span className={styles.time}>. {timeAgo(createdAt)}</span>
                        </p>
                        <RiMoreFill/>
                    </div>
                    <Content href={route}>
                        <div className={styles.text}>
                            <p>{tweet_info.title}</p>
                        </div>
                        {tweet_info.imageUrl &&
                            <div className={styles["post-image"]}>
                                <Image src={tweet_info.imageUrl} width={100} height={100} alt="xlogo" priority layout="intrinsic"/>
                            </div>
                        }
                    </Content>
                    {withQuote && 
                        <ReTweet
                            id={reposted_details._id}
                            userDetails={reposted_details.user_details}
                            title={reposted_details.postText}
                            imageUrl={reposted_details.postImage}
                            createdAt={createdAt}
                        />
                    }
                    <div className={styles.elements}>
                        <PostAction 
                            reacters={tweet_info.reacters} 
                            id={tweet_info.id} 
                            title={tweet_info.title} 
                            imageUrl={tweet_info.imageUrl}
                            userDetails={tweet_info.userDetails}
                            commenters={tweet_info.commenters}
                            reposters={tweet_info.reposters}
                            createdAt={createdAt}
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
