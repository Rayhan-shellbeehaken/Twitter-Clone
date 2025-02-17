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

export default function PostAction({id,reacters,title,imageUrl,userDetails,commenters}) {
    const [reacted,setReacted] = useState(false);
    const router = useRouter();
    const { data: session } = useSession();
    const [show,setShow] = useState(false);
    const [quotePopUp, setQuotePopUp] = useState(true);
    const [repostBox,setRepostBox] = useState(false);
    const popupRef = useRef(null);
    const {toggleAlert} = useAppContext();

    useEffect(()=>{
        setReacted(reacters.includes(session?.user?._id));
    },[reacters,session]);

    const onReact = async() => {
        reacted ? 
        reacters = reacters.filter(userId => userId !== session?.user?._id) :
        reacters.push(session?.user?._id); 

        const data = {
            reacters : reacters
        }
        try{
            const tweet = await axios.patch(`/api/tweets?id=${id}`,data)
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
                />
            }

            {quotePopUp &&
                <QuoteBox
                    setQuotePopUp={setQuotePopUp}
                />
            }
            
            <div className={styles.iconbox} onClick={onComment}><LiaCommentAlt/><span>{commenters.length}</span></div>
            <div className={`${styles.iconbox} ${styles.repost}`} onClick={()=>setRepostBox(true)}>
                {
                    repostBox && 
                    <div className={styles.repostbox} ref={popupRef}>
                        <button onClick={onRepost}><BiRepost/> <span>Repost</span></button>
                        <button onClick={onQuote}><RiEditLine/> <span>Quote</span></button>
                    </div>
                }
                <BiRepost/><span>60K</span>
            </div>

            <div className={`${styles.iconbox} ${reacted ? styles.react : ''}`} onClick={onReact}>
                {reacted ? 
                    <TiHeartFullOutline/> : 
                    <CiHeart/>
                }
                <span>{reacters.length || 0}</span>
            </div>
        </>
    )
}
