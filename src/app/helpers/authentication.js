'use server'

import { signIn, signOut } from "@/auth";

export async function doLogin(formData) {
    const action = formData.get('action');
    console.log(action);
    await signIn(action, { redirectTo : "/home"});
}

export async function doCredentialLogin(formData){
    const email = formData.get('Email');
    const password = formData.get('Password');
    const action = formData.get('action');

    console.log("EMAIL :: "+email);
    console.log("PASSWORD :: "+password);
    console.log("ACTION  :: "+action);

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

export async function doLogout() {
    await signOut({redirectTo : "/"})
}