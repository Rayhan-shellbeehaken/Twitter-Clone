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

export async function getAllMessages(person1, person2) {
    const messages = await Conversations.findOne({
        $or : [
            {person1, person2},
            {person1 : person2, person2 : person1}
        ]
    });
    return messages;
}