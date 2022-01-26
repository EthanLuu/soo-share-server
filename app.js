const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv/config");

const app = express();

app.use(express.json());
app.use(cors());
const port = process.env.port || 8080;

const postsRoute = require("./routes/posts");
const usersRoute = require("./routes/users");
const likesRoute = require("./routes/likes");
const tagsRoute = require("./routes/tags");
const imageRoute = require("./routes/image");

app.use("/posts", postsRoute);
app.use("/users", usersRoute);
app.use("/likes", likesRoute);
app.use("/tags", tagsRoute);
app.use("/image", imageRoute);

mongoose.connect(
    process.env.DB_URI,
    { useNewUrlParser: true, useUnifiedTopology: true },
    () => {
        console.log("conntected to mongodb");
    }
);

app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
});

module.exports = app;
