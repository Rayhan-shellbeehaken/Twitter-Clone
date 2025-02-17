import { NextResponse } from 'next/server'
import { getToken } from 'next-auth/jwt';

// This function can be marked `async` if using `await` inside
const publicPaths = ["/"];
const privatePaths = ["/home","/profile","/dateofbirth"];
const privateRegexPaths = [/^\/[^\/]+\/status\/[^\/]+$/]; 

export async function middleware(request) {
    try{
        const currentPath = request.nextUrl.pathname;
        const token = await getToken({ req: request, secret: process.env.SECRET_TOKEN });
        const isPrivate = privatePaths.includes(currentPath) || privateRegexPaths.some((regex) => regex.test(currentPath));
        if(token && publicPaths.includes(currentPath)){
            if(token.isNewUser){
                return NextResponse.redirect(new URL("/dateofbirth", request.url));
            }else{
                return NextResponse.redirect(new URL(`/home?feed=foryou`, request.url));
            }
        }
        else if(!token && isPrivate){
            return NextResponse.redirect(new URL("/", request.url));
        }
    }catch(error){
        console.log(error);
    }
}
 
// See "Matching Paths" below to learn more
export const config = {
  matcher: ["/","/home","/dateofbirth","/profile","/:name/status/:tweetId*"],
}