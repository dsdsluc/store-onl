const User = require("../../models/user.model");
const userSocket = require("../../sockets/client/user.socket")

module.exports.notFriend = async (req, res) => {
    const myUserId = res.locals.user.id
      // SocketIO
      userSocket(res);
    // End SocketIO
    const myUser = await User.findOne({
      _id: myUserId
    });
    const listFriends = myUser.friendList;
    let listFriendId = [];
    listFriends.forEach(item=>{
      listFriendId.push(item.user_id);
    })
    const requestFriends = myUser.requestFriends;
    const acceptFriends = myUser.acceptFriends;
    const users = await User.find({
        $and: [
          {
            _id: {$ne: myUserId},
          },{
            _id: {$nin: requestFriends}
          },
          {
            _id: {$nin: acceptFriends}
          },{
            _id: {$nin: listFriendId}
          }
        ],      
        status: "active",
        deleted: false
    }).select("fullName id avatar");
  res.render("client/pages/users/not-friend", {
    pageTitle: "Danh sách người dung",
    users: users
  });
};

module.exports.request = async (req, res) => {
    const myUserId = res.locals.user.id
      // SocketIO
      userSocket(res);
    // End SocketIO
    const myUser = await User.findOne({
      _id: myUserId
    });
    const requestFriends = myUser.requestFriends;
    const users = await User.find({
        _id: {$in:requestFriends },
        status: "active",
        deleted: false
    }).select("fullName id avatar");

  res.render("client/pages/users/request", {
    pageTitle: "Danh sách lời mời",
    users: users
  });
};
module.exports.accpet = async (req, res) => {
    const myUserId = res.locals.user.id
      // SocketIO
      userSocket(res);
    // End SocketIO
    const myUser = await User.findOne({
      _id: myUserId
    });
    const acceptFriends = myUser.acceptFriends;
    const users = await User.find({
        _id: {$in:acceptFriends },
        status: "active",
        deleted: false
    }).select("fullName id avatar");

  res.render("client/pages/users/accept", {
    pageTitle: "Danh sách lời mời kết bạn",
    users: users,
    user: myUser
  });
};

module.exports.friends = async (req, res) =>{
  const userId = res.locals.user.id;
    const myUser = await User.findOne({
        _id: userId
    });

    const friendList = myUser.friendList;
    const friendListId = friendList.map(item=>item.user_id)
    

    const users = await User.find({
     _id: {$in:friendListId}
    }).select("fullName id avatar statusOnline")
    
    users.forEach(user=>{
      const inforUser = friendList.find(item=>item.user_id == user.id);
      user.roomChatId = inforUser.room_chat_id
    })

    res.render("client/pages/users/friend", {
      pageTitle: "Danh sách bạn bè",
      users: users
    });
}