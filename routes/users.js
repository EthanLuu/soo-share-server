const bcrypt = require("bcryptjs");
const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");
const User = require("../models/User");

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
        const { username, password, nickname, avatar } = req.body;

        // check if username existed
        const oldUser = await User.findOne({ username });
        if (oldUser) {
            return res
                .status(409)
                .send("用户名已存在，请登录或更换用户名进行注册。");
        }

        const encryptedPassword = await bcrypt.hash(password, 10);

        const user = await User.create({
            username,
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
            const user = await User.findOne({ token });
            if (user) {
                return res.status(200).json(user);
            } else {
                return res.status(400).send("token失效");
            }
        }
        const { username, password } = req.body;
        const user = await User.findOne({ username });
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

router.put("/:userId", async (req, res) => {
    try {
        User.updateOne({ _id: req.params.userId }, { $set: req.body });
    } catch (error) {
        res.json(error);
    }
});

module.exports = router;
