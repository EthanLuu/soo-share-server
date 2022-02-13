const express = require("express");
const router = express.Router();
const Post = require("../models/Post");
const auth = require("../middlewares/auth");
const jieba = require("nodejieba");

const commonAggregations = [
    {
        $sort: {
            date: -1
        }
    },
    {
        $lookup: {
            from: "users",
            localField: "userName",
            foreignField: "username",
            as: "userInfo"
        }
    },
    {
        $lookup: {
            from: "likes",
            localField: "_id",
            foreignField: "postId",
            as: "likeInfo"
        }
    },
    {
        $unwind: "$userInfo"
    },
    {
        $project: {
            "userInfo.avatar": 1,
            "userInfo._id": 1,
            "userInfo.nickname": 1,
            likeInfo: 1,
            content: 1,
            link: 1,
            tag: 1,
            date: 1,
            userName: 1
        }
    }
];

const getPaginateAggregations = (req) => [
    {
        $skip: +req.query.skip || 0
    },
    {
        $limit: +req.query.limit || 10
    }
];

router.get("/", async (req, res) => {
    try {
        const match = {};
        if (req.query.userName) {
            match.userName = req.query.userName;
        }
        if (req.query.tag) {
            match.tag = req.query.tag;
        }
        const posts = await Post.aggregate([
            {
                $match: match
            },
            ...commonAggregations,
            ...getPaginateAggregations(req)
        ]);

        res.json(posts);
    } catch (error) {
        console.log(error);
        res.json(error);
    }
});

router.post("/", auth, async (req, res) => {
    const post = new Post(req.body);
    try {
        post.keywords = jieba.cut(post.content).join(" ");
        const createdPost = await post.save();
        const data = await Post.aggregate([
            {
                $match: {
                    _id: createdPost._id
                }
            },
            ...commonAggregations
        ]);

        res.json(data?.[0]);
    } catch (error) {
        console.log(error);
        res.json(error);
    }
});

router.get("/:postId", auth, async (req, res) => {
    try {
        const post = await Post.findById(req.params.postId);
        res.json(post);
    } catch (error) {
        res.json(error);
    }
});

router.delete("/:postId", auth, async (req, res) => {
    try {
        const removedPost = await Post.findOneAndRemove({
            _id: req.params.postId
        });
        res.json(removedPost);
    } catch (error) {
        res.json(error);
    }
});

router.patch("/:postId", auth, async (req, res) => {
    try {
        const updatedPost = await Post.findOneAndUpdate(
            { _id: req.params.postId },
            {
                $set: {
                    content: req.body.content,
                    link: req.body.link,
                    tag: req.body.tag
                }
            }
        );
        res.json(updatedPost);
    } catch (error) {
        console.log(error);
        res.json(error);
    }
});

router.get("/search/:searchKey", async (req, res) => {
    try {
        const posts = await Post.aggregate([
            { $match: { $text: { $search: req.params.searchKey } } },
            ...commonAggregations,
            ...getPaginateAggregations(req)
        ]);

        res.json(posts);
    } catch (error) {
        console.log(error);
        res.json(error);
    }
});

module.exports = router;
