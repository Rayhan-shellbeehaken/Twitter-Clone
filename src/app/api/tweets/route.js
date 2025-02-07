import { connect } from "@/app/db/db.config";
import { NextResponse } from "next/server";
import { auth } from "@/auth";
import { addTweet, getTweets } from "@/app/service/tweet/tweetService";

connect();

export async function POST(reqBody) {
    try{
        const session = await auth();
        if(!session?.user){
            return NextResponse.json({message : 'Login first'},{status : 400});
        }
        const user = session?.user._id;
        const tweet = await addTweet(user,reqBody);
        return NextResponse.json({message : "Successfully added", tweet},{status : 200});
    }catch(error){
        return NextResponse.json({error : error.message},{status : 500});
    }
}

export async function GET() {
    try{
        const tweets = await getTweets();
        return NextResponse.json({message : "Successfully get all tweet",tweets},{status : 200});
    }catch(error){
        return NextResponse.json({error : error.message},{status : 500});
    }
}