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

export async function createNewConversation(data) {
    const {person1, person2} = data;
    const exist = await Conversations.findOne({
        $or : [
            {person1, person2},
            {person1 : person2, person2 : person1}
        ]
    });
    if(exist) return exist._id;
    
    const newConversation = new Conversations(data);
    const conversation = await newConversation.save();
    return conversation._id;
}

export async function addMessage(id,data){
    const conversation = await Conversations.findByIdAndUpdate(
        id,
        {$push : { messages : data}},
        { new: true, runValidators: true }
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