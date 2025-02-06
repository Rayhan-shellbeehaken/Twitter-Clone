import React from 'react'
import { auth } from '@/auth'
import Sidemenu from './Sidemenu'

export default async function SidemenuServer() {
    const session = await auth();
    if(!session?.user) return null;

    return <Sidemenu/>;
}
