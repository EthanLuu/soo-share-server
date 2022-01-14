const express = require("express");

const app = express();

const port = process.env.port || 8080;

app.get("/", (req, res) => res.send("Hello"));

app.get("/about", (req, res) => res.send("I'm ethan"));

app.listen(port, () => {
    console.log(`Server running on ${port}`);
});
