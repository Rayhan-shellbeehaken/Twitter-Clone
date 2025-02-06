import React from 'react'
import styles from './layout.module.css'
import Sidemenu from '@/app/components/sidemenu/Sidemenu'

export default function ProtectedLayout({children}) {
    return (
        <div className={styles.layout}>
            <Sidemenu/>
            {children}
        </div>
    )
}
