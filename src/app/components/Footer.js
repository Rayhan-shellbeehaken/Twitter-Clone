import React from 'react'
import styles from './css/footer.module.css';

export default function Footer() {
    const items = ['About', 'Download the X app', 'Help Center', 'Terms of Service', 'Privacy Policy', 
        'Cookie Policy', 'Accessibility', 'Ads info', 'Blog', 'Careers', 'Brand Resources', 'Advertising',
        'Marketing', 'X for Business', 'Developers', 'Directory', 'Settings', '© 2025 X Corp'
    ]
    return (
        <div className={styles["footer-container"]}>
            <ul className={styles.footer}>
                {
                    items.map((item) => (
                        <li>{item}</li>
                    ))
                }
            </ul>
        </div>
    )
}
