import React from 'react'
import styles from './postlist.module.css';
import SinglePost from '../singlepost/SinglePost';
import fetchTweet from '@/app/helpers/fetchTweets';

export default async function PostList({feed}) {
    const result = await fetchTweet();
    console.log(result.tweets);
    const tweets = result.tweets;
    return (
        <div>
            {
                tweets.map(tweet => {
                    const buffer = tweet.postImage.data;
                    const base64Image = Buffer.from(buffer).toString('base64');
                    const mimeType = 'image/png'; 

                    const imageUrl = `data:${mimeType};base64,${base64Image}`;
                    return <SinglePost key={tweet._id} title={tweet.postText} imageUrl={imageUrl}/>
                })
            }
        </div>
    )
}
