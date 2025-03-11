import { connect } from "@/app/db/db.config";
import { NextResponse } from "next/server";
import { auth } from "@/auth";
import { addTweet, getTweet, getTweets, updateTweet } from "@/app/service/tweet/tweetService";

connect();

export async function POST(request) {
    try{
        const session = await auth();
        if(!session?.user){
            return NextResponse.json({message : 'Login first'},{status : 400});
        }
        const user = session?.user._id;
        const tweet = await addTweet(user,request);
        return NextResponse.json({message : "Successfully added", tweet},{status : 200});
    }catch(error){
        return NextResponse.json({error : error.message},{status : 500});
    }
}

export async function GET(request) {
    try{
        const url = new URL(request.url);
        const page = url.searchParams.get('page') || 1;
        const tweetId = url.searchParams.get('tweetId') || null;
        const parent = url.searchParams.get('parent') || null;
        const user = url.searchParams.get('user') || null;
        const filterBy = url.searchParams.get('filterBy') || null;
        let result;
        if(tweetId){
            result = await getTweet(tweetId);
        }else if(page){
            result = await getTweets(page,parent,user,filterBy);
        }
        if(!result) return NextResponse.json({message : 'Not found'},{status : 400});
        return NextResponse.json({message : "Successfully get result",result},{status : 200});
    }catch(error){
        return NextResponse.json({error : error.message},{status : 500});
    }
}

export async function PATCH(request) {
    try{
        const session = await auth();
        if(!session?.user){
            return NextResponse.json({message : 'Login first'},{status : 400});
        }
        const url = new URL(request.url);
        const tweetId = url.searchParams.get('id') || "";
        const tweet = await updateTweet(tweetId,request);
        return NextResponse.json({message : 'Tweet update successfull',tweet},{status : 200});
    }catch(error){
        return NextResponse.json({message : error.message},{status : 500});
    }
}