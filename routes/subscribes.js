const express = require("express");
const router = express.Router();
const Subscribe = require("../models/Subscribe");
const auth = require("../middlewares/auth");
const mongoose = require("mongoose");

router.get("/:userId", async (req, res) => {
    try {
        const subscribes = await Subscribe.find({
            fromUserId: req.params.userId
        });
        res.json(subscribes);
    } catch (error) {
        console.log(error);
    }
});

router.post("/", async (req, res) => {
    try {
        const newSubscribe = new Subscribe({
            fromUserId: mongoose.Types.ObjectId(req.body.fromUserId),
            toUserId: mongoose.Types.ObjectId(req.body.toUserId)
        });
        const savedSubscribe = await newSubscribe.save();
        res.json(savedSubscribe);
    } catch (error) {
        console.log(error);
    }
});

router.delete("/", async (req, res) => {
    try {
        const deletedSubscribe = await Subscribe.findOneAndRemove({
            fromUserId: mongoose.Types.ObjectId(req.body.fromUserId),
            toUserId: mongoose.Types.ObjectId(req.body.toUserId)
        });
        res.json(deletedSubscribe);
    } catch (error) {
        console.log(error);
    }
});

module.exports = router;
