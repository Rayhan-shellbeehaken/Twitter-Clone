import React from 'react'
import styles from './termsandcondition.module.css';

export default function TermsAndCondition() {
    const terms = ['Terms of Service','Privacy Policy','Cookie Policy','Accessibility','Ads info',
        'More...','© 2025 X Corp.']

    return (
        <div className={styles.container}>
            <ul>
                {
                    terms.map(term => (
                        <li key={term}>{term}</li>
                    ))
                }
            </ul>
        </div>
    )
}
