import Conversations from "@/app/models/conversation.model";
import mongoose from "mongoose";

export async function createNewRoom(roomId) {
    const room = await Conversations.findOne({room : roomId});
    if(room) return room;
    else{
        const newRoom = new Conversations({room : roomId});
        const room = await newRoom.save();
        return room;
    }
}

export async function addNewMessage(id, user, data){
    const conversation = await Conversations.findOneAndUpdate(
        {room : id},
        {
          $set : { lastSender : user },
          $push: { messages: data } },
        {new: true }
    )
    return conversation;
}

export async function changeMessageStatus(id, user, status) {
  const query = { room: id };

  if (status === "seen") {
      query.lastSender = { $ne: new mongoose.Types.ObjectId(user) };
  }

  const conversation = await Conversations.findOneAndUpdate(
    query,
    {status : status},
    {new: true}
  )
  return conversation;
}

export async function getAllMessages(roomId) {
    const result = await Conversations.findOne({room : roomId},{status : 1, messages : 1});
    return result;
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
            lastMessage: { $arrayElemAt: ["$messages", -1] },
            status: 1
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
            lastMessageCreatedAt: "$lastMessage.createdAt",
            lastMessageSender: "$lastMessage.sender",
            status: 1
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
            "lastMessageSender": 1,
            "otherUserInfo.profileImage": 1,
            "otherUserInfo.username": 1,
            "otherUserInfo._id": 1,
            "status":1
          }
        }
    ]
    const chatList = await Conversations.aggregate(query);
    return chatList;
}
