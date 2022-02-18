const mongoose = require("mongoose");

const BookmarkSchema = mongoose.Schema({
    userId: mongoose.SchemaTypes.ObjectId,
    postId: mongoose.SchemaTypes.ObjectId
});

module.exports = mongoose.model("bookmarks", BookmarkSchema);
