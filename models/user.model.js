const mongoose = require('mongoose');
const generateHelper = require("../helpers/generate")

const UserSchema = new mongoose.Schema({
    fullName: String,
    email: String,
    password: String,
    tokenUser: {
        type: String,
        default: generateHelper.generateRandomString(30)
    },
    phone: String,
    avatar: String,
    statusOnline: String,
    status: {
        type: String,
        default: "active"
    },
    requestFriends: Array,
    acceptFriends: Array,
    friendList: [
        {
            user_id: String,
            room_chat_id: String
        }
    ],
    deleted: {
        type: Boolean,
        default: false
    },
    deletedAt: Date
  },{ timestamps: true });
const User = mongoose.model('User', UserSchema,"users");
module.exports = User;