const Chat = require("../../models/chat.model");
const User = require("../../models/user.model");
const chatSocket = require("../../sockets/client/chat.socket")

module.exports.index = async (req, res) => {

  // SocketIO
  chatSocket(res)
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
