const mongoose = require("mongoose");

const LikeSchema = mongoose.Schema({
    postId: mongoose.SchemaTypes.ObjectId,
    userId: mongoose.SchemaTypes.ObjectId
});

module.exports = mongoose.model("likes", LikeSchema);
