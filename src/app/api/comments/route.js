import { connect } from "@/app/db/db.config";
import { NextResponse } from "next/server";
import { auth } from "@/auth";
import { addComment } from "@/app/service/comment/commentService";

connect();

export async function POST(request) {
    try{
        const session = await auth();
        if(!session?.user){
            return NextResponse.json({message : 'Login first'},{status : 400});
        }
        const user = session?.user?._id;
        const response = await addComment(user,request);
        return NextResponse.json({message : 'Successfully commented',response},{status : 200});
    }catch(error){
        throw NextResponse.json({error : error.message},{status : 500});
    }
}