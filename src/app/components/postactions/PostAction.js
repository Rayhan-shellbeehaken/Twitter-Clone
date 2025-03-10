"use client"
import React, { useEffect } from 'react'
import { LiaCommentAlt } from "react-icons/lia";
import { BiRepost } from "react-icons/bi";
import { CiHeart } from "react-icons/ci";
import { TiHeartFullOutline } from "react-icons/ti";
import styles from './postaction.module.css';
import { useState } from 'react';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import { useSession } from "next-auth/react";
import CommentPopUp from '../commentpopup/CommentPopUp';
import { RiEditLine } from "react-icons/ri";
import { useRef } from 'react';
import { useAppContext } from '@/app/store/store';
import QuoteBox from '../quotebox/QuoteBox';

export default function PostAction({id,reacters,title,imageUrl,userDetails,commenters,reposters,createdAt}) {
    const [reacted,setReacted] = useState(false);
    const [reposted,setReposted] = useState(false);
    const router = useRouter();
    const { data: session } = useSession();
    const [show,setShow] = useState(false);
    const [quotePopUp, setQuotePopUp] = useState(false);
    const [repostBox,setRepostBox] = useState(false);
    const popupRef = useRef(null);
    const {toggleAlert} = useAppContext();

    useEffect(()=>{
        setReacted(reacters.includes(session?.user?._id));
        setReposted(reposters.includes(session?.user?._id));
    },[reacters,reposters,session]);

    const onReact = async() => {
        reacted ? 
        reacters = reacters.filter(userId => userId !== session?.user?._id) :
        reacters.push(session?.user?._id); 
        const data = {
            reacters : reacters
        }
        const notification = {
            notificationType : "react",
            notifiedTo : userDetails._id,
            redirectTo : `/${userDetails.username}/status/${id}`,
        };

        try{
            const tweet = await axios.patch(`/api/tweets?id=${id}`,data);
            if(tweet.status === 200 && !reacted && session?.user?._id !== userDetails._id){
                const result = await axios.post('/api/notifications',notification);
            }
            router.refresh();
        }catch(error){
            console.log(error);
        }   
    }

    const onComment = async() => {
        setShow(!show);
    }

    const onRepost = async() => {
        
        const data = {
            repostedTweet : id
        }
        try{
            const response = await axios.post('/api/tweets',data);
            if(response.status == 200 && session?.user?._id !== userDetails._id){
                const notification = {
                    notificationType : "repost",
                    notifiedTo : userDetails._id,
                    redirectTo: `/${userDetails.username}/status/${response.data.tweet._id}`
                };
                const result = await axios.post('/api/notifications',notification);
            }
            toggleAlert("success","Successfully posted");
            setRepostBox(false);
            router.refresh();
        }catch(error){
            toggleAlert("error","Failed to post");
            console.log(error);
        }
    }

    const onQuote = async() => {
        setRepostBox(false)
        setQuotePopUp(true);
    }

    useEffect(() => {
        const handleClickOutside = (event) => {
          if (popupRef.current && !popupRef.current.contains(event.target)) {
            setRepostBox(false);
          }
        };
    
        if (repostBox) {
          document.addEventListener("mousedown", handleClickOutside);
        } else {
          document.removeEventListener("mousedown", handleClickOutside);
        }
    
        return () => {
          document.removeEventListener("mousedown", handleClickOutside);
        };
      }, [repostBox]);

    return (
        <>
            {show && 
                <CommentPopUp
                    id={id} 
                    title={title} 
                    setShow={setShow} 
                    imageUrl={imageUrl} 
                    userDetails={userDetails}
                    commenters={commenters}
                    userId={session?.user?._id}
                    createdAt={createdAt}
                />
            }

            {quotePopUp &&
                <QuoteBox
                    id={id}
                    setQuotePopUp={setQuotePopUp}
                    userDetails={userDetails}
                    title={title}
                    imageUrl={imageUrl}
                    createdAt={createdAt}
                />
            }
            
            <div className={`${styles.iconbox} ${styles["comment-icon"]}`} onClick={onComment}><LiaCommentAlt/><span>{commenters.length}</span></div>
            <div className={`${styles.iconbox} ${styles.repost} ${reposted ? styles.reposted : ''}`} onClick={()=>setRepostBox(true)}>
                {
                    repostBox && 
                    <div className={styles.repostbox} ref={popupRef}>
                        <button onClick={onRepost}><BiRepost/> <span>Repost</span></button>
                        <button onClick={onQuote}><RiEditLine/> <span>Quote</span></button>
                    </div>
                }
                <BiRepost/><span>{reposters.length}</span>
            </div>

            <div className={`${styles.iconbox} ${styles.like} ${reacted ? styles.react : ''}`} onClick={onReact}>
                {reacted ? 
                    <TiHeartFullOutline/> : 
                    <CiHeart/>
                }
                <span>{reacters.length || 0}</span>
            </div>
        </>
    )
}
