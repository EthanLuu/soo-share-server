const express = require("express");
const router = express.Router();
const Report = require("../models/Report");
const User = require("../models/User");
const auth = require("../middlewares/auth");
const mongoose = require("mongoose");

router.get("/", async (req, res) => {
    try {
        const reports = await Report.aggregate()
    } catch (error) {
        console.log(error);
    }
});

module.exports = router;
