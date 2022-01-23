const mongoose = require("mongoose");

const TagSchema = mongoose.Schema({
    key: String,
    name: String
});

module.exports = mongoose.model("tags", TagSchema);
