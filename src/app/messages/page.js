"use client"
import React, { useState } from 'react'
import styles from './page.module.css';
import { useAppContext } from '../store/store';

export default function page() {
  const {setMessageModal} = useAppContext();
  return (
    <div className={styles.page}>
      <div>
          <h2>Select a message</h2>
          <p>Choose from your existing conversations, start a new one, or just keep swimming.</p>
          <button onClick={()=>setMessageModal(true)}>New messages</button>
      </div>
    </div>
  )
}
