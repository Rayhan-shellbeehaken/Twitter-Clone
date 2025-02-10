import React from 'react'
import styles from './postlist.module.css';
import SinglePost from '../singlepost/SinglePost';
import fetchTweet from '@/app/helpers/fetchTweets';
import { Suspense } from 'react';
import Loader from '../loader/Loader';

export default async function PostList({page}) {
    const result = await fetchTweet(page);
    const tweets = result.tweets;
    await new Promise(resolve => setTimeout(resolve,2000));
    if(tweets.length === 0) return null;

    return (
        <div>
            {
                tweets.map(tweet => {
                    let imageUrl = "";
                    if(tweet.postImage !== null){
                        const buffer = tweet.postImage.data;
                        const base64Image = Buffer.from(buffer).toString('base64');
                        const mimeType = 'image/png'; 

                        imageUrl = `data:${mimeType};base64,${base64Image}`;
                    }
                    
                    return <SinglePost key={tweet._id} title={tweet.postText} imageUrl={imageUrl}/>
                })
            }
            <Suspense fallback={<Loader/>}>
                <PostList page={page + 1}/>
            </Suspense>
        </div>
    )
}
