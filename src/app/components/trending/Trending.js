import React from 'react'
import styles from './trending.module.css';
import { RiMoreFill } from "react-icons/ri";

export default function Trending() {
    const lists = [
        {   
            indx : 0,
            place : "Trending in Bangladesh",
            title : "I Don't",
            postCount : "1.5M posts" 
        },
        {
            indx : 1,
            place : "Manchestar United . Trending",
            title : "#CristianoRonaldo",
            postCount : "3248 posts" 
        },
        {
            indx : 2,
            place : "Business & Finance . Trending",
            title : "#GameFi",
            postCount : "3728 posts" 
        },
        {
            indx : 3,
            place : "Trending in Bangladesh",
            title : "#Adnan Khan",
            postCount : "5394 posts" 
        }
    ]

    return (
        <div className={styles.container}>
            <h2>Whats happening?</h2>
            <div className={styles["trending-list"]}>
                {
                    lists.map(list => (
                        <div key={list.indx} className={styles.item}>
                            <div>
                                <p>{list.place}</p>
                                <p>{list.title}</p>
                                <p>{list.postCount}</p>
                            </div>
                            <div>
                                <RiMoreFill/>
                            </div>
                        </div>
                    ))
                }
            </div>
            <p>Show more</p>
        </div>
    )
}
