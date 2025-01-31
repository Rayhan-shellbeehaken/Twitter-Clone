"use client"
import React from 'react'
import axios from 'axios';
import styles from './page.module.css';
import Image from 'next/image';
import xlogo from '../../../public/images/xlogo.png';
import DateOfBirth from '@/app/components/dateofbirth/DateOfBirth';
import {birthDate} from '@/app/helpers/birthdate';
import { useRouter } from 'next/navigation';
import { useAppContext } from '@/app/store/store';

export default function page() {

    const router = useRouter();
    const { toggleAlert } = useAppContext();

    async function handleSubmit(event) {
        event.preventDefault()
        try{
            const formData = new FormData(event.currentTarget);
            const birthDay = birthDate(formData);
            const data = {
                dateofBirth : birthDay
            }
            const response = await axios.patch('/api/user',data);
            console.log(response);
            toggleAlert("success", "User registration successfully");
            router.push('/home');
            
        }catch(error){
            toggleAlert("error", "User registration failed");
            console.log("ERROR IN UPTADING DATE OF BIRTH");
            console.log(error);
        }
    }

    return (
        <div className={styles.page}>
            <div className={styles.container}>
                <div className={styles.image}>
                    <Image src={xlogo} alt='xlogo' priority layout="intrinsic"/>
                </div>
                <div className={styles.title}>
                    <h2>Whats your birth date?</h2>
                    <p>This won't be public</p>
                </div>
                <form onSubmit={handleSubmit} className={styles["form-container"]}>
                    <DateOfBirth/>
                    <div>
                        <p>
                            By signing up, you agree to the <span>Terms of Service</span> and <span>Privacy Policy</span>, 
                            including <span>Cookie Use</span>. X may use your contact information, including your 
                            email address and phone number for purposes outlined in our Privacy Policy, 
                            like keeping your account secure and personalizing our services, including 
                            ads. <span>Learn more.</span> Others will be able to find you by email or phone number, 
                            when provided, unless you choose otherwise <span>here</span>.
                        </p>
                    </div>
                    <button className={styles.button}>Sign Up</button>
                </form>
            </div>
        </div>
    )
}
