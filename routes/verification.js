const express = require("express");
const router = express.Router();
const Verification = require("../models/Verification");
const nodemailer = require("nodemailer");
const smtpTransport = require("nodemailer-smtp-transport");

const transport = nodemailer.createTransport(
    smtpTransport({
        host: process.env.SMTP_HOST,
        port: process.env.SMTP_PORT,
        secure: true,
        auth: {
            user: process.env.EMAIL_ACCOUNT,
            pass: process.env.EMAIL_PASSWORD
        }
    })
);

const regEmail =
    /^([a-zA-Z0-9]+[_|\_|\.]?)*[a-zA-Z0-9]+@([a-zA-Z0-9]+[_|\_|\.]?)*[a-zA-Z0-9]+\.[a-zA-Z]{2,3}$/;

const generateCode = () => {
    let code = "";
    for (let i = 0; i < 6; i++) {
        code += parseInt(Math.random() * 10);
    }
    return code;
};

router.post("/", async (req, res) => {
    try {
        const { email } = req.body;
        if (!regEmail.test(email)) {
            res.error("邮箱不符合规则");
        }
        const code = generateCode();
        transport.sendMail({
            from: process.env.EMAIL_ACCOUNT,
            to: email,
            subject: "验证你的电子邮件 - Soo Share",
            html: `<div
            style="
                flex: auto;
                display: flex;
                justify-content: center;
                flex-direction: column;
                align-items: center;
                background-color: rgb(245, 246, 247);
                color: #444;
            "
            >
            <h1>Soo Share</h1>
            <p>
                您正在使用该邮箱注册
                <a
                    style="color: rgb(58, 98, 184); text-decoration: none"
                    href="https://share.ethanloo.cn"
                    >Soo Share</a
                >
                的账号，您的验证码是：
            </p>
            <p
                style="
                    background-color: #fff;
                    padding: 18px;
                    border-radius: 8px;
                    font-size: 1.2rem;
                    box-shadow: 1px 1px 8px #aaa;
                    font-weight: 600;
                "
            >
                ${code}
            </p>
            <p>该验证码仅在 5 分钟内有效。</p>
        </div>`
        });
        await Verification.deleteMany({ email });
        const d = new Date();
        d.setMinutes(d.getMinutes() + 5);
        const verfication = new Verification({
            email,
            code,
            expire_time: d
        });
        await verfication.save();
        res.json({ msg: "success" });
    } catch (error) {
        console.log(error);
        res.status(500);
    }
});

module.exports = router;
