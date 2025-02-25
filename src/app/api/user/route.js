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
        const id = await session?.user?._id;
        const user = await getUser(id);

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

        if(!session?.user){
            return NextResponse.json({message : 'Login first', session},{status : 400});
        }

        const id = session?.user._id;
        const user = await updateUser(id,reqBody);

        return NextResponse.json({
            message : 'Successfully Updated',
            user
        },{status : 200});

    }catch(error){
        return NextResponse.json({error : error.message},{status : 500});
    }
}