import React from 'react'
import styles from './postlist.module.css';
import SinglePost from '../singlepost/SinglePost';
import {fetchTweet} from '@/app/helpers/tweetoperation';
import { Suspense } from 'react';
import Loading from '@/app/loading';
import { auth } from '@/auth';

export default async function PostList({params,page,user,type}) {
    
    const getFilterBy = (type) =>{
        let filterBy = null;
        switch (type) {
            case "with_replies":
                filterBy = "repost"
                break;
            case "likes":
                filterBy = "react"
                break;
            default:
                break;
        }
        return filterBy;
    }

    const session = await auth();
    const filterBy = getFilterBy(type);
    const result = user ? await fetchTweet(page,null,user,filterBy) : await fetchTweet(page,null,null,filterBy);
    const tweets = result.result;
    if(tweets.length === 0) return <div className={styles.end}>No more post available</div>;

    return (
        <div>
            {
                tweets
                .filter(tweet => params !== "following" || tweet.user_details.followers.includes(session?.user?._id))
                .map(tweet => {
                    return (
                        <SinglePost 
                            key={tweet._id} 
                            id={tweet._id} 
                            title={tweet.postText} 
                            imageUrl={tweet.postImage} 
                            reacters={tweet.reacters}
                            userDetails={tweet.user_details}
                            commenters={tweet.commenters}
                            reposters={tweet.reposters}
                            notclickable={false}
                            reposted_details={tweet.reposted_details}
                            createdAt={tweet.createdAt}
                        />
                    )
                })
            }
            <Suspense fallback={<Loading/>}>
                <PostList page={page + 1} user={user} type={type}/>
            </Suspense>
        </div>
    )
}
