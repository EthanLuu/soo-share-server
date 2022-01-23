const express = require("express");
const router = express.Router();
const Tag = require("../models/Tag");

router.get("/", async (req, res) => {
    try {
        const tags = await Tag.find();
        res.json(tags);
    } catch (error) {
        res.json(error);
    }
});

router.post("/", async (req, res) => {
    try {
        const tag = new Tag(req.body);
        const savedtag = await tag.save();
        res.json(savedtag);
    } catch (error) {
        res.json(error);
    }
});

module.exports = router;
