import Conversations from "@/app/models/conversation.model";

export async function createNewRoom(roomId) {
    const room = await Conversations.findOne({room : roomId});
    if(room) return room;
    else{
        const newRoom = new Conversations({room : roomId});
        const room = await newRoom.save();
        return room;
    }
}

export async function addNewMessage(id,data){
    const conversation = await Conversations.findOneAndUpdate(
        {room : id},
        {$push: { messages: data } },
        {new: true }
    )
    
    return conversation;
}

export async function changeMessageStatus(id,status) {
  const conversation = await Conversations.findOneAndUpdate(
    {room : id},
    {status : status},
    {new: true}
  )
}

export async function getAllMessages(roomId) {
    const result = await Conversations.findOne({room : roomId});
    return result.messages;
}

export async function getChatList(userId) {
    const query = [
        {
          $match: {
            room: { 
              $regex: new RegExp(`^${userId}-|-${userId}$`)
            }
          }
        },
        {
          $project: {
            splitroom: { $split: ["$room", "-"] },
            lastMessage: { $arrayElemAt: ["$messages", -1] }
          }
        },
        {
          $project: {
            otherUserId: {
              $arrayElemAt: [
                "$splitroom",
                {
                  $cond: {
                    if: { $eq: [{ $arrayElemAt: ["$splitroom", 0] }, userId] }, 
                    then: 1,
                    else: 0
                  }
                }
              ]
            },
            lastMessageText: "$lastMessage.text",
            lastMessageCreatedAt: "$lastMessage.createdAt"
          }
        },
        {
          $addFields: {
            otherUserId: { $toObjectId: "$otherUserId" } 
          }
        },
        {
          $lookup: {
            from: "users",  
            localField: "otherUserId",  
            foreignField: "_id",  
            as: "otherUserInfo"
          }
        },
        {
          $unwind: "$otherUserInfo"
        },
        {
          $project: {
            "lastMessageText": 1,
            "lastMessageCreatedAt": 1,
            "otherUserInfo.profileImage": 1,
            "otherUserInfo.username": 1,
            "otherUserInfo._id": 1 
          }
        }
    ]
    const chatList = await Conversations.aggregate(query);
    return chatList;
}
