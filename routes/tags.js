const express = require("express");
const router = express.Router();
const Tag = require("../models/Tag");
const auth = require("../middlewares/auth");


router.get("/", async (req, res) => {
    try {
        const tags = await Tag.find();
        res.json(tags);
    } catch (error) {
        res.json(error);
    }
});

router.post("/", auth, async (req, res) => {
    try {
        const tag = new Tag(req.body);
        const savedtag = await tag.save();
        res.json(savedtag);
    } catch (error) {
        res.json(error);
    }
});

router.delete("/:key", auth, async (req, res) => {
    try {
        const removedTag = await Tag.findOneAndRemove({
            key: req.params.key
        });
        res.json(removedTag);
    } catch (error) {
        console.log(error);
        res.json(error);
    }
});

module.exports = router;
