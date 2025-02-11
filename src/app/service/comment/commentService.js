import { addNewComment } from "@/app/repository/comment/commentRepository";

export async function addComment(user,request) {
    const formData = await request.formData();
    const commentImage = formData.get('commentImage') || "";
    const commentText = formData.get('commentText') || "";
    const tweet = formData.get('tweet') || "";

    console.log(commentText + "  " + tweet);
    if(commentImage){
        const bufferData = await commentImage.arrayBuffer();
        const base64 = Buffer.from(bufferData);

        const comment = await addNewComment(commentText,base64,tweet,user);
        return comment;
    }else{
        const comment = await addNewComment(commentText,null,tweet,user);
        return comment;
    }
}