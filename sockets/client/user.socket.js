const RoomChat = require("../../models/room-chat.model")
const User = require("../../models/user.model");

module.exports = (res) => {
  const myUserId = res.locals.user.id; // id ong A
  _io.once("connection",  (socket) => {
    socket.on("CLIENT_ADD_FRIEND", async (id)=>{
      const userId = id; // id ong B
      
      // Them id cua A vao acceptFriends cua B
      const existIdAinB = await User.findOne({
        _id: userId,
        acceptFriends: myUserId
      })

      if(!existIdAinB){
        await User.updateOne({
          _id: userId
        },{
          $push: {
            acceptFriends: myUserId
          }
        })
      }
      // Them id cua B vao requestFriends cua A
      const existIdBinA = await User.findOne({
        _id: userId,
        requestFriends: myUserId
      })

      if(!existIdBinA){
        await User.updateOne({
          _id: myUserId
        },{
          $push: {
            requestFriends: userId
          }
        })
      }
      //Khi A gửi lời mời kết bạn cho ông B cập nhật số lượng cho ông B
      const inforUserB = await User.findOne({
        _id: userId
      });
      const lengthAcceptFriends = inforUserB.acceptFriends.length;

      socket.broadcast.emit("SERVER_RETURN_LENGTH_ACCEPT_FRIEND", {
        userId: userId,
        lengthAcceptFriends: lengthAcceptFriends
      });

      const inforUserA = await User.findOne({
        _id: myUserId
      })

      socket.broadcast.emit("SERVER_RETURN_INFOR_ACCEPT_FRIEND", {
        userId: userId,
        inforUserA: inforUserA
      });
    })
    socket.on("CLIENT_CANCEL_FRIEND",async (id)=>{
      const userId = id; // id ong B
      // Xoa id của ông A ra khỏi acceptFriends của ông B

      const existIdAinB = await User.findOne({
        _id: userId,
        acceptFriends: myUserId
      })

      if(existIdAinB){
        await User.updateOne({
          _id: userId
        },{
          $pull: {
            acceptFriends: myUserId
          }
        })
      }
      // Xoa id của ông B ra khỏi requestFriends của ông A
      const existIdBinA = await User.findOne({
        _id: myUserId,
        requestFriends: userId
      })

      if(existIdBinA){
        await User.updateOne({
          _id: myUserId
        },{
          $pull: {
            requestFriends: userId
          }
        })
      }
      //Khi A gửi hủy kết bạn cho ông B cập nhật số lượng cho ông B
      const inforUserB = await User.findOne({
        _id: userId
      });
      const lengthAcceptFriends = inforUserB.acceptFriends.length;

      socket.broadcast.emit("SERVER_RETURN_LENGTH_ACCEPT_FRIEND", {
        userId: userId,
        lengthAcceptFriends: lengthAcceptFriends
      });

      
      socket.broadcast.emit("SERVER_RETURN_USER_ID_CANCEL_FRIEND", {
        userId: userId,
        userIdA: myUserId
      })

    })
    socket.on("CLIENT_REFUSE_FRIEND",async (id)=>{
      const userId = id; // id ong B

      // Xoa id của ông A ra khỏi acceptFriends của ông B
      const existIdAinB = await User.findOne({
        _id: myUserId,
        acceptFriends: userId
      })

      if(existIdAinB){
        await User.updateOne({
          _id: myUserId
        },{
          $pull: {
            acceptFriends: userId
          }
        })
      }
      // Xoa id của ông B ra khỏi requestFriends của ông A
      const existIdBinA = await User.findOne({
        _id: userId,
        requestFriends: myUserId
      })

      if(existIdBinA){
        await User.updateOne({
          _id: userId
        },{
          $pull: {
            requestFriends: myUserId
          }
        })
      }
    })
    socket.on("CLIENT_ACCEPT_FRIEND",async (id)=>{
      const userId = id; // id ong B

      // Xoa id của ông A ra khỏi acceptFriends của ông B
      //Them {user_id, room_chat_id} cua a vao friendList cua B
      const existIdAinB = await User.findOne({
        _id: myUserId,
        acceptFriends: userId
      })
      let roomChat;
      const existIdBinA = await User.findOne({
        _id: userId,
        requestFriends: myUserId
      });
      if(existIdBinA && existIdAinB){
        roomChat = new RoomChat({
          typeRoom: "friend",
          users: [
            {
              user_id: myUserId,
              role: "superAdmin"
            },{
              user_id: userId,
              role: "superAdmin"
            }
          ]
        })
        await roomChat.save()
      }

      if(existIdAinB){
        await User.updateOne({
          _id: myUserId
        },{
          $push: {
            friendList: {
              user_id: userId,
              room_chat_id: roomChat.id
            }
          },
          $pull: {
            acceptFriends: userId
          }
        })
      }
      // Xoa id của ông B ra khỏi requestFriends của ông A
      //Them {user_id, room_chat_id} cua B vao friendList cua A
      

      if(existIdBinA){
        await User.updateOne({
          _id: userId
        },{
          $push: {
            friendList: {
              user_id: myUserId,
              room_chat_id: roomChat.id
            }
          },
          $pull: {
            requestFriends: myUserId
          }
        })
      }
    })
  });
};
