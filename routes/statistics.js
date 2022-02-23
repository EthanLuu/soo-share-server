const express = require("express");
const router = express.Router();
const Like = require("../models/Like");
const auth = require("../middlewares/auth");
const Post = require("../models/Post");
const Subscribe = require("../models/Subscribe");
const Tag = require("../models/Tag");
const User = require("../models/User");
const Bookmark = require("../models/Bookmark");

router.get("/posts", async (req, res) => {
    try {
        const cnt = Post.length;
        res.json({cnt});
    } catch (error) {
        res.error(error);
    }
});

router.get("/tags", async (req, res) => {
    try {
        const cnt = Tag.length;
        res.json({cnt});
    } catch (error) {
        res.error(error);
    }
});

router.get("/likes", async (req, res) => {
    try {
        const cnt = Like.length;
        res.json({cnt});
    } catch (error) {
        res.error(error);
    }
});

router.get("/subscribes", async (req, res) => {
    try {
        const cnt = Subscribe.length;
        res.json({cnt});
    } catch (error) {
        res.error(error);
    }
});

router.get("/users", async (req, res) => {
    try {
        const cnt = User.length;
        res.json({cnt});
    } catch (error) {
        res.error(error);
    }
});

router.get("/bookmarks", async (req, res) => {
    try {
        const cnt = Bookmark.length;
        res.json({cnt});
    } catch (error) {
        res.error(error);
    }
});

module.exports = router;
