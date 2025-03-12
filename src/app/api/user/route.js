import { connect } from "@/app/db/db.config";
import { NextResponse } from "next/server";
import { auth } from "@/auth";
import { getUser, updateUser } from "@/app/service/user/userService";

connect();

export async function GET(request) {
    try{
        const session = await auth();
        if(!session?.user){
            return NextResponse.json({message : 'Login first', session},{status : 400});
        }
        const url = new URL(request.url);
        const id = url.searchParams.get('id') || null;
        const username = url.searchParams.get('username') || null;
        const type = url.searchParams.get('type') || null;
        const user = await getUser(id,username,type);
        console.log(user);

        return NextResponse.json({
            message : 'Successfully get user info',
            user
        },{status : 200});
    }catch(error){
        return NextResponse.json({error : error.message},{status : 500});
    }
}


export async function PATCH(request) {
    try{
        const reqBody = await request.json();
        const session = await auth();
        const url = new URL(request.url);
        const userId = url.searchParams.get('id');
        const followed = url.searchParams.get('followed');

        if(!session?.user){
            return NextResponse.json({message : 'Login first', session},{status : 400});
        }

        const id = (userId !== null) ? userId : session?.user?._id;
        const user = await updateUser(id,reqBody,followed);

        return NextResponse.json({
            message : 'Successfully Updated',
            user
        },{status : 200});

    }catch(error){
        return NextResponse.json({error : error.message},{status : 500});
    }
}