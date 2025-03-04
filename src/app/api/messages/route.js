import { connect } from "@/app/db/db.config";
import { NextResponse } from "next/server";
import { auth } from "@/auth";
import { addNewMessage, getMessages } from "@/app/service/message/messageService";

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

export async function GET(request){
    try{
        const session = await auth();
        if(!session?.user){
            return NextResponse.json({message : 'Login first'},{stauts : 400});
        }
        const person1 = session?.user?._id;
        const url = new URL(request.url);
        const person2 = url.searchParams.get('user') || null;
        const messages = await getMessages(person1, person2);
        return NextResponse.json({message : 'Successfully get all data', messages},{status : 200});
    }catch(error){
        return NextResponse.json({error : error.message},{status : 500});
    }
}