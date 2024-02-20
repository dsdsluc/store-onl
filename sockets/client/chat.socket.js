const Chat = require("../../models/chat.model");
const uploadToClouldinary = require("../../helpers/uploadToClouldinary");

module.exports = (res) => {
  const userId = res.locals.user.id;
  const userfullName = res.locals.user.fullName;
  _io.once("connection", (socket) => {
    socket.on("CLIENT_SEND_MESSAGE", async (data) => {
      let images = [];

      for (const imageBuffer of data.images) {
        const link = await uploadToClouldinary(imageBuffer);
        images.push(link);
      }

      const chat = {
        user_id: userId,
        content: data.content,
        images: images,
      };

      const newRecord = new Chat(chat);
      await newRecord.save();

      _io.emit("SERVER_RETURN_MESSAGE", {
        userId: userId,
        fullName: userfullName,
        content: data.content,
        images: images,
      });
    });

    socket.on("CLIENT_SEND_TYPING", (type) => {
      socket.broadcast.emit("SERVER_RETURN_TYPING", {
        userId: userId,
        fullName: userfullName,
        type: type,
      });
    });
  });
};
