import React from 'react'
import styles from './postlist.module.css';
import SinglePost from '../singlepost/SinglePost';
import fetchTweet from '@/app/helpers/fetchTweets';

export default async function PostList({feed}) {
    const result = await fetchTweet(1);
    const tweets = result.tweets;
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
        </div>
    )
}
