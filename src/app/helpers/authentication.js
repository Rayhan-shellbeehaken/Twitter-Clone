'use server'

import { signIn, signOut } from "@/auth";

export async function doLogin(formData) {
    const action = formData.get('action');
    console.log(action);
    if(action === "credentials"){
        const email = formData.get('email');
        const password = formData.get('password');

        await signIn(action, {
            redirectTo : "/home",
            email,
            password
        })
    }
    else{
        await signIn(action, { redirectTo : "/home"});
    }
    
}

export async function doLogout() {
    await signOut({redirectTo : "/"})
}