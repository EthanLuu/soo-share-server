const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv/config");

const app = express();

app.use(express.json());
app.use(cors());
const port = process.env.PORT || 8080;

const postsRoute = require("./routes/posts");
const usersRoute = require("./routes/users");
const likesRoute = require("./routes/likes");
const tagsRoute = require("./routes/tags");
const imageRoute = require("./routes/image");
const subscribeRoute = require("./routes/subscribes");
const bookmarkRoute = require("./routes/bookmarks");
const statisticsRoute = require("./routes/statistics");
const reportsRoute = require("./routes/reports");
const verficationRoute = require("./routes/verification");

app.use("/posts", postsRoute);
app.use("/users", usersRoute);
app.use("/likes", likesRoute);
app.use("/tags", tagsRoute);
app.use("/image", imageRoute);
app.use("/subscribes", subscribeRoute);
app.use("/bookmarks", bookmarkRoute);
app.use("/statistics", statisticsRoute);
app.use("/reports", reportsRoute);
app.use("/verification", verficationRoute);

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
