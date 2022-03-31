const bcrypt = require("bcryptjs");
const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");
const User = require("../models/User");
const Verification = require("../models/Verification");
const auth = require("../middlewares/auth");

router.get("/:username", async (req, res) => {
    try {
        const user = await User.findOne({ username: req.params.username });
        res.json(user);
    } catch (error) {
        console.log(error);
        res.json(error);
    }
});

router.post("/register", async (req, res) => {
    try {
        const { username, password, nickname, avatar, email, code } = req.body;
        console.log(username, email);
        const oldUser =
            (await User.findOne({ username })) ||
            (await User.findOne({ email }));
        if (oldUser) {
            return res
                .status(409)
                .send("用户名或邮箱已存在。");
        }
        const verification = await Verification.findOne({ email });
        if (!verification || verification.get("code") !== code) {
            return res.status(409).send("请确认邮箱验证码正确。");
        }
        if (verification.get("expire_time") < new Date()) {
            return res.status(409).send("邮箱验证码已过期，请重新验证。");
        }

        const encryptedPassword = await bcrypt.hash(password, 10);

        const user = await User.create({
            username,
            email,
            password: encryptedPassword,
            nickname,
            avatar
        });

        const token = jwt.sign(
            { user_id: user._id, username },
            process.env.TOKEN_KEY
        );
        user.token = token;
        await user.save();
        res.status(201).json(user);
    } catch (error) {
        console.log(error);
        res.json(error);
    }
});

router.post("/login", async (req, res) => {
    try {
        const token = req.headers?.authorization;
        if (token) {
            const userName = jwt.verify(token, process.env.TOKEN_KEY).username;
            const user = await User.findOne({ userName });
            if (user) {
                return res.status(200).json(user);
            } else {
                return res.status(400).send("token失效");
            }
        }
        const { username, password, eamil } = req.body;
        const user =
            (await User.findOne({ username })) ||
            (await User.findOne({ eamil }));
        if (user && (await bcrypt.compare(password, user.password))) {
            const token = jwt.sign(
                { user_id: user._id, username },
                process.env.TOKEN_KEY
            );
            user.token = token;

            await user.save();
            return res.status(200).json(user);
        }
        res.status(400).send("用户名或密码错误");
    } catch (error) {
        console.log(error);
        res.json(error);
    }
});

router.post("/login/:token", async (req, res) => {
    try {
        const { token } = req.params;
        const user = await User.findOne({ token });
        if (user) {
            const token = jwt.sign(
                { user_id: user._id, username: user.username },
                process.env.TOKEN_KEY,
                {
                    expiresIn: "2h"
                }
            );

            user.token = token;

            await user.save();
            return res.status(200).json(user);
        } else {
            res.send("token失效");
        }
    } catch (error) {
        console.log(error);
        res.json(error);
    }
});

router.put("/:userId", auth, async (req, res) => {
    try {
        const updatedUser = await User.findOneAndUpdate(
            { _id: req.params.userId },
            { $set: req.body }
        );
        res.json(updatedUser);
    } catch (error) {
        res.json(error);
    }
});

module.exports = router;
