import React from 'react'
import styles from './page.module.css'
import ProtectedLayout from '@/app/layouts/protected/layout'
import SearchBox from '@/app/components/searchbox/SearchBox'
import Trending from '@/app/components/trending/Trending'
import TermsAndCondition from '@/app/components/termsandcondition/TermsAndCondition'
import ReleventPeople from '@/app/components/releventpeople/ReleventPeople'
import { GoArrowLeft } from "react-icons/go";
import Link from 'next/link'
import SinglePost from '@/app/components/singlepost/SinglePost'
import { fetchATweet, fetchTweet } from '@/app/helpers/tweetoperation'
import CommentBox from '@/app/components/commentbox/CommentBox'
import Popup from '@/app/components/popup/Popup'

export default async function page({params}) {
    const {tweetId} = await params;
    const result = await fetchATweet(tweetId);
    const tweet = result.result[0];

    let backUrl = "/home?feed=foryou";
    if(tweet.parent !== null){
        const parentTweetResult = await fetchATweet(tweet.parent);
        const parentTweetUser = parentTweetResult.result[0].user_details.username;
        backUrl = `/${parentTweetUser}/status/${tweet.parent}`;
    }
    const commentResult = await fetchTweet(1,tweetId);
    const comments = commentResult.result;
    
    return (
        <ProtectedLayout>
            <div className={styles.page}>    
                <div className={styles.left}>
                    <Popup/>
                    <div className={styles.head}>
                        <Link href={backUrl} className={styles.back}>
                            <GoArrowLeft/>
                        </Link>
                        <div>Post</div>
                    </div>
                    <SinglePost 
                        id={tweet._id} 
                        title={tweet.postText} 
                        imageUrl={tweet.postImage}
                        reacters={tweet.reacters}
                        userDetails={tweet.user_details}
                        commenters={tweet.commenters}
                        reposters={tweet.reposters}
                        notclickable={true}
                        reposted_details={tweet.reposted_details}
                    />
                    <div className={styles["replying-to"]}>
                        <p>Replying to <span>@_{tweet.user_details.username}</span></p>
                    </div>
                    <CommentBox tweet={tweet}/>

                    {
                        comments.map(comment => (
                            <SinglePost
                                key={comment._id}
                                id={comment._id} 
                                title={comment.postText} 
                                imageUrl={comment.postImage}
                                reacters={comment.reacters}
                                userDetails={comment.user_details}
                                commenters={comment.commenters}
                                reposters={comment.reposters}
                                notclickable={false}
                                reposted_details={comment.reposted_details}
                            />
                        ))
                    }
                </div>
                <div className={styles.right}>
                    <SearchBox/>
                    <ReleventPeople/>
                    <Trending/>
                    <TermsAndCondition/>
                </div>
            </div>
        </ProtectedLayout>
        
    )
}