/* Modules */
const mongoose = require("mongoose");

const ModelsPosts = mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" , required: true },
    message: { type: String, required: true },
    imageUrl: { type: String, required: false },
    usersLiked: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" , required: true }]
},
{
    timestamps: true
});

module.exports = mongoose.model('Posts', ModelsPosts);