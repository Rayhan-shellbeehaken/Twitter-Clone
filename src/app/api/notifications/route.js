import { connect } from "@/app/db/db.config";
import { NextResponse } from "next/server";
import { auth } from "@/auth";
import { addNewNotification, getAllNotifications, updateNotification } from "@/app/service/notification/notificationService";

connect();

export async function POST(request) {
    try{
        const session = await auth();
        if(!session?.user){
            return NextResponse.json({message : 'Login first'},{status : 400});
        }
        const user = session?.user?._id;
        const notification = await addNewNotification(user,request);
        return NextResponse.json({message : 'Notification added successfully', notification},{status : 200});
    }catch(error){
        return NextResponse.json({error : error.message},{status : 500});
    }
}

export async function GET(request){
    try{
        const url = new URL(request.url);
        const user = url.searchParams.get('user');
        const category = url.searchParams.get('category') || null;
        
        if(!user){
            return NextResponse.json({message : 'Login first'},{status : 400});
        }
        const notifications = await getAllNotifications(user,category);
        return NextResponse.json({message : 'Get all notification successfully',notifications},{status : 200});
    }catch(error){
        return NextResponse.json({error : error.message},{status : 500});
    }
}

export async function PATCH(request) {
    try{
        const session = await auth();
        if(!session?.user){
            return NextResponse.json({message : 'Login first'},{status : 404});
        }
        const notifications = await updateNotification(session?.user?._id);
        return NextResponse.json({message : 'Update all notification successfully', notifications},{status : 200});
    }catch(error){
        return NextResponse.json({message : error.message},{status : 500});
    }
}