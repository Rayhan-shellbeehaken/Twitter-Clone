import { connect } from "@/app/db/db.config";
import User from "@/app/models/user.model";
import { NextResponse } from "next/server";
import { auth } from "@/auth";
import { getToken } from 'next-auth/jwt'

connect();

export async function PATCH(request) {
    try{
        const reqBody = await request.json();
        console.log("FULL REQUEST ------------------->");
        console.log(request);

        const session = await auth();
        console.log("SESSION :: ");
        console.log(session);
        const token = await getToken(request);
        console.log("TOKEN :: "+token);
        if(!session?.user){
            return NextResponse.json({message : 'Login first', token},{status : 400});
        }
        const id = session?.user._id;
        

        const user = await User.findByIdAndUpdate(id, reqBody, {
            new : true,
            runValidators : true,
        })

        return NextResponse.json({
            message : 'Successfully Updated',
            user,
        },{status : 200});

    }catch(error){
        console.log("FAILED TO UPDATE");
        return NextResponse.json({error : error.message},{status : 500});
    }
}