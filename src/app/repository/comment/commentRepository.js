import Comment from "@/app/models/comment.model";
import Tweet from "@/app/models/tweet.model";

export async function addNewComment(commentText, base64, tweet, user) {
    const newComment = new Comment({
        commentText,
        commentImage : base64,
        tweet,
        user
    })

    const savedComment = await newComment.save();

    await Tweet.updateOne({_id : tweet},{
        $push : {
            commenters : savedComment._id
        }
    })
    return savedComment;
}