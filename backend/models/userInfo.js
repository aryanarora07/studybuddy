// models/userInfo.js

const mongoose = require("mongoose");

const userInfoSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
        unique: true // Ensure email is unique
    },
    major: {
        type: String,
        default: ""
    },
    year: {
        type: Number,
        default: 0
    }
});

const UserInfo = mongoose.model('UserInfo', userInfoSchema);

module.exports = UserInfo;
