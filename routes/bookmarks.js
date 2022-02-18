const express = require("express");
const router = express.Router();
const auth = require("../middlewares/auth");
const mongoose = require("mongoose");
const Bookmark = require("../models/Bookmark");

router.get("/:userId", async (req, res) => {
    try {
        const bookmarks = await Bookmark.find({
            userId: req.params.userId
        });
        res.json(bookmarks);
    } catch (error) {
        console.log(error);
    }
});

router.post("/", async (req, res) => {
    try {
        const newBookmark = new Bookmark({
            userId: mongoose.Types.ObjectId(req.body.userId),
            postId: mongoose.Types.ObjectId(req.body.postId)
        });
        const savedBookmark = await newBookmark.save();
        res.json(savedBookmark);
    } catch (error) {
        console.log(error);
    }
});

router.delete("/", async (req, res) => {
    try {
        const deletedBookmark = await Bookmark.findOneAndRemove({
            userId: mongoose.Types.ObjectId(req.body.userId),
            postId: mongoose.Types.ObjectId(req.body.postId)
        });
        res.json(deletedBookmark);
    } catch (error) {
        console.log(error);
    }
});

module.exports = router;
