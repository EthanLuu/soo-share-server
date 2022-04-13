const express = require("express");
const router = express.Router();
const Like = require("../models/Like");
const auth = require("../middlewares/auth");
const Post = require("../models/Post");
const Subscribe = require("../models/Subscribe");
const Tag = require("../models/Tag");
const User = require("../models/User");
const Bookmark = require("../models/Bookmark");

router.get("/", async (req, res) => {
    try {
        const postCnt = await Post.countDocuments();
        const tagCnt = await Tag.countDocuments();
        const userCnt = await User.countDocuments();
        const likeCnt = await Like.countDocuments();
        const subscribeCnt = await Subscribe.countDocuments();
        const bookmarkCnt = await Bookmark.countDocuments();
        res.json({
            postCnt,
            tagCnt,
            userCnt,
            likeCnt,
            subscribeCnt,
            bookmarkCnt
        });
    } catch (error) {
        console.log(error);
        res.json(error);
    }
});

router.get("/posts", async (req, res) => {
    try {
        const cnt = Post.length;
        const posts = await Post.aggregate([
            {
                $group: {
                    _id: {
                        $dateToString: { format: "%Y-%m-%d", date: "$date" }
                    },
                    count: {
                        $sum: 1
                    }
                }
            }
        ]);
        res.json({ cnt, posts });
    } catch (error) {
        res.error(error);
    }
});

router.get("/tags", async (req, res) => {
    try {
        const cnt = Tag.length;
        res.json({ cnt });
    } catch (error) {
        res.error(error);
    }
});

router.get("/likes", async (req, res) => {
    try {
        const cnt = Like.length;
        res.json({ cnt });
    } catch (error) {
        res.error(error);
    }
});

router.get("/subscribes", async (req, res) => {
    try {
        const cnt = Subscribe.length;
        res.json({ cnt });
    } catch (error) {
        res.error(error);
    }
});

router.get("/users", async (req, res) => {
    try {
        const cnt = User.length;
        res.json({ cnt });
    } catch (error) {
        res.error(error);
    }
});

router.get("/bookmarks", async (req, res) => {
    try {
        const cnt = Bookmark.length;
        res.json({ cnt });
    } catch (error) {
        res.error(error);
    }
});

module.exports = router;
