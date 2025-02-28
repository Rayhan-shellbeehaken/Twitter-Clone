import React from 'react'
import styles from './page.module.css';

export default async function page({params}) {
    const {userId} = await params;
    return (
        <div className={styles.page}>
            <div>
                <h2>Select a message</h2>
                <p>Choose from your existing conversations, start a new one, or just keep swimming.</p>
                <button>New messages</button>
            </div>
        </div>
    )
}
