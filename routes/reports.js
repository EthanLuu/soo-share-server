const express = require("express");
const router = express.Router();
const Report = require("../models/Report");
const User = require("../models/User");
const auth = require("../middlewares/auth");
const mongoose = require("mongoose");

router.get("/", async (req, res) => {
    try {
        const reports = await Report.aggregate([
            {
                $lookup: {
                    from: "posts",
                    localField: "postId",
                    foreignField: "_id",
                    as: "postInfo"
                }
            },
            {
                $unwind: "$postInfo"
            },
            {
                $lookup: {
                    from: "users",
                    localField: "postInfo.userName",
                    foreignField: "username",
                    as: "userInfo"
                }
            },
            {
                $unwind: "$userInfo"
            },
            {
                $project: {
                    "postInfo.keywords": 0,
                    "userInfo.password": 0,
                    "userInfo.token": 0
                }
            }
        ]);
        res.json(reports);
    } catch (error) {
        console.log(error);
    }
});

router.post("/", async (req, res) => {
    try {
        const newReport = new Report(req.body);
        const savedReport = await newReport.save();
        res.json(savedReport);
    } catch (error) {
        console.log(error);
    }
});

router.delete("/:id", async (req, res) => {
    try {
        const report = await Report.findByIdAndRemove(req.params.id);
        res.json(report);
    } catch (error) {
        console.log(error);
    }
});
module.exports = router;
