import React from 'react'
import ProtectedLayout from '../../layouts/protected/layout'
import styles from './page.module.css';

export default function page() {
    return (
        <ProtectedLayout>      
            <div className={styles.page}>This is profile page</div>
        </ProtectedLayout>
    )
}
