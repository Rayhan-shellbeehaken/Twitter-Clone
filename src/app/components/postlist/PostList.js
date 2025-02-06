import React from 'react'
import styles from './postlist.module.css';
import SinglePost from '../singlepost/SinglePost';

export default function PostList() {

    return (
        <div>
            <SinglePost/>
            <SinglePost/>
        </div>
    )
}
