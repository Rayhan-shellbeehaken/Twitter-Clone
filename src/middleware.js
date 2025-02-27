import { NextResponse } from 'next/server'
import { getToken } from 'next-auth/jwt';

// This function can be marked `async` if using `await` inside
const publicPaths = ["/"];
const privatePaths = ["/home","/profile","/dateofbirth","/notifications"];
const privateRegexPaths = [/^\/[^\/]+\/status\/[^\/]+$/, /^\/[^\/]+$/]; 

export async function middleware(request) {
    try{
        const currentPath = request.nextUrl.pathname;
        const token = await getToken({ req: request, secret: process.env.SECRET_TOKEN });
        const isPrivate = privatePaths.includes(currentPath) || privateRegexPaths.some((regex) => regex.test(currentPath));
        const response = NextResponse.next();

        if(currentPath === "/" || currentPath === "/dateofbirth"){
            response.headers.set('x-hide-bar',"true");
        }else{
            response.headers.set('x-hide-bar',"false");
        }
        
        const prevPages = request.cookies.get('pageHistory')?.value;
        const pageHistory = prevPages ? JSON.parse(prevPages) : [];
        const prev = request.headers.get("referer");
        let prevPath;
        if(prev){
            prevPath = prev.split("?")[0].split("http://localhost:3000")[1];; 
        }
        
        if(prevPath && pageHistory[pageHistory.length - 1] !== currentPath){
            pageHistory.push(prevPath);
        }else if(pageHistory[pageHistory.length - 1] === currentPath){
            pageHistory.pop();
        }
        
        response.cookies.set("pageHistory",JSON.stringify(pageHistory),{path : "/"});


        if(token && publicPaths.includes(currentPath)){
            if(token.isNewUser){
                return NextResponse.redirect(new URL("/dateofbirth", request.url));
            }else{
                response.headers.set('x-hide-bar',"false");
                return NextResponse.redirect(new URL(`/home?feed=foryou`, request.url));
            }
        }
        else if(!token && isPrivate){
            return NextResponse.redirect(new URL("/", request.url));
        }

        return response;
    }catch(error){
        console.log(error);
    }
}
 
// See "Matching Paths" below to learn more
export const config = {
  matcher: ["/","/home","/notifications","/dateofbirth","/profile","/:name/status/:tweetId*","/:profile"],
}