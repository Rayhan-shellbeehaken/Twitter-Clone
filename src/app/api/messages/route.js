import { connect } from "@/app/db/db.config";
import { NextResponse } from "next/server";
import { auth } from "@/auth";
import { addMessage, changeStatus, createRoom, getChats, getMessages } from "@/app/service/message/messageService";

connect();

export async function POST(request) {
    try{
        const session = await auth();
        if(!session?.user){
            return NextResponse.json({message : 'Login first'},{status : 400});
        }
        const room = await createRoom(request);
        return NextResponse.json({message : 'Successfully created', room},{status : 200});``
    }catch(error){
        return NextResponse.json({error : error.message},{status : 500});
    }
}

export async function PATCH(request){
    try{
        const session = await auth();
        if(!session?.user){
            return NextResponse.json({message : 'Login first'},{status : 400});
        }
        const user = session?.user?._id;
        const url = new URL(request.url);
        const messageStatus = url.searchParams.get('status') || null;
        if(messageStatus){
            const message = await changeStatus(user, request);
            return NextResponse.json({message : 'Successfully changed status', message}, {status : 200});
        }else{
            const message = await addMessage(user, request);
            return NextResponse.json({message : 'Successfully saved message', message}, {status : 200});
        }
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
        const userId = session?.user?._id;
        const url = new URL(request.url);
        const roomId = url.searchParams.get('roomId') || null;
        if(roomId === null){
            const chatList = await getChats(userId);
            return NextResponse.json({message : 'Successfully get all data', chatList},{status : 200});
        }else{
            const messages = await getMessages(roomId);
            return NextResponse.json({message : 'Successfully get all data', messages},{status : 200});
        }
    }catch(error){
        return NextResponse.json({error : error.message},{status : 500});
    }
}