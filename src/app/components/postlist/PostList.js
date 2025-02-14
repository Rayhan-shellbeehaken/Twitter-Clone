import React from 'react'
import styles from './postlist.module.css';
import SinglePost from '../singlepost/SinglePost';
import {fetchTweet} from '@/app/helpers/tweetoperation';
import { Suspense } from 'react';
import Loader from '../loader/Loader';

export default async function PostList({page}) {
    const result = await fetchTweet(page,null);
    const tweets = result.result;
    if(tweets.length === 0) return <div className={styles.end}>No more post available</div>;

    return (
        <div>
            {
                tweets.map(tweet => {
                    console.log(tweet);
                    return (
                        <SinglePost 
                            key={tweet._id} 
                            id={tweet._id} 
                            title={tweet.postText} 
                            imageUrl={tweet.postImage} 
                            reacters={tweet.reacters}
                            userDetails={tweet.user_details}
                            commenters={tweet.commenters}
                            notclickable={false}
                        />
                    )
                })
            }
            <Suspense fallback={<Loader/>}>
                <PostList page={page + 1}/>
            </Suspense>
        </div>
    )
}
