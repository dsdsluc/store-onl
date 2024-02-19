const Chat = require("../../models/chat.model");
const User = require("../../models/user.model");
module.exports.index = async (req, res) => {
  const userId = res.locals.user.id;
  const userfullName = res.locals.user.fullName;

  // SocketIO
  _io.once("connection", (socket) => {
    socket.on("CLIENT_SEND_MESSAGE", async (content) => {
      const chat = {
        user_id: userId,
        content: content,
      };
      const newRecord = new Chat(chat);
      await newRecord.save();

      

      _io.emit("SERVER_RETURN_MESSAGE", {
        userId: userId,
        fullName: userfullName,
        content: content,
      });
    });
   
    socket.on("CLIENT_SEND_TYPING",(type)=>{
      socket.broadcast.emit("SERVER_RETURN_TYPING",{
        userId:userId,
        fullName: userfullName,
        type: type
      })
    })
  });
  
  // End SocketIO
  const chats = await Chat.find({
    deleted: false,
  });
  for (const chat of chats) {
    const user = await User.findOne({
      _id: chat.user_id,
    }).select("fullName");

    chat.user = user;
  }

  res.render("client/pages/chat/index", {
    pageTitle: "Chat",
    chats: chats,
  });
};
