const express = require("express");
const router = express.Router();
const Like = require("../models/Like");
const auth = require("../middlewares/auth");
const mongoose = require("mongoose");

router.get("/", async (req, res) => {
    try {
        const likes = await Like.find();
        res.json(likes);
    } catch (error) {
        res.json(error);
    }
});

router.post("/", auth, async (req, res) => {
    const like = new Like({
        userId: mongoose.Types.ObjectId(req.body.userId),
        postId: mongoose.Types.ObjectId(req.body.postId)
    });
    try {
        const createdLike = await Like.create(like);
        res.json(createdLike);
    } catch (error) {
        res.json(error);
    }
});

router.delete("/:likeId", auth, async (req, res) => {
    try {
        const deletedLike = await Like.findByIdAndRemove(req.params.likeId);
        res.json(deletedLike);
    } catch (error) {
        res.json(error);
    }
});

module.exports = router;
