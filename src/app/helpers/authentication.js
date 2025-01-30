'use server'

import { signIn, signOut } from "@/auth";

export async function doLogin(formData) {
    const action = formData.get('action');
    console.log(action);
    const response = await signIn(action);
}

export async function doCredentialLogin(formData){
    const email = formData.get('Email');
    const password = formData.get('Password');

    try{
        const response = await signIn("credentials", {
            email,
            password,
            redirect : false,
        });
        console.log(response);
        return response;
    }catch(error){
        console.log("ERROR : ");
        console.log(error);
        throw error;
    }
    
}

export async function doCredentialSignUp(formData) {
    const name = formData.get('username');
    const email = formData.get('email');
    const password = formData.get('password');
    const dateofbirth = formData.get('dateofbirth');

    console.log("USERNAME :: "+name);
    console.log("EMAIL :: "+email);
    console.log("PASSWORD :: "+password);
    console.log("DATE OF BIRTH :: "+dateofbirth);

    try{
        const response = await signIn("credentials",{
            name,
            email,
            password,
            dateofbirth,
            redirect : false
        })
        return response;
    }catch(error){
        console.log("SIGN UP ERROR");
        console.log(error);
        throw error;
    }
}

export async function doLogout() {
    await signOut({redirectTo : "/"})
}