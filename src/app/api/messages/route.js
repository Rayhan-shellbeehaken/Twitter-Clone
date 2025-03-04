import { connect } from "@/app/db/db.config";
import { NextResponse } from "next/server";
import { auth } from "@/auth";
import { addNewMessage } from "@/app/service/message/messageService";

connect();

export async function POST(request) {
    try{
        const session = await auth();
        if(!session?.user){
            return NextResponse.json({message : 'Login first'},{status : 400});
        }
        const user = session?.user?._id;
        const messages = await addNewMessage(user,request);
        return NextResponse.json({message : 'Successfully added', messages},{status : 200});
    }catch(error){
        return NextResponse.json({error : error.message},{status : 500});
    }
}