const RoomChat = require("../../models/room-chat.model");
const User = require("../../models/user.model");

module.exports.index = async(req, res) => {
    const userId = res.locals.user.id ;
    const roomsChat = await RoomChat.find({
        "users.user_id": userId,
        typeRoom: "group",
        deleted: false
    })
    console.log(roomsChat);
    res.render("client/pages/rooms-chat/index",{
        pageTitle : "Phòng chat",
        roomsChat: roomsChat
    });
}

module.exports.create = async(req, res) => {
    const friendList = res.locals.user.friendList

    for (const friend of friendList) {
        const inforUser = await User.findOne({
            _id: friend.user_id
        }).select("fullName avatar")
        friend.inforUser = inforUser
    }
    res.render("client/pages/rooms-chat/create",{
        pageTitle : "Phòng chat",
        friendList: friendList
    });
}

module.exports.createPost = async(req, res) => {
    const usersId = req.body.usersId
    const obJectChat = {
        title: req.body.title,
        typeRoom: "group",
        users:[]
    }
    for (const item of usersId) {

        obJectChat.users.push({
            user_id: item,
            role: "user"
        })
    }
    obJectChat.users.push({
        user_id: res.locals.user.id,
        role: "superAdmin"
    });
    const room = new RoomChat(obJectChat);
    await room.save()
    res.redirect(`/chat/${room.id}`)
}