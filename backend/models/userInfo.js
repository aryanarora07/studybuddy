const mongoose = require("mongoose");


const Schema = new mongoose.Schema({
    major:{
        type:String,
        required: true,
    },
    year:{
        type: Number,
        required: true,
    }
})

const UserInfo = mongoose.model('UserInfo', Schema);

module.exports = UserInfo;