const mongoose = require("mongoose");

const SubsribeSchema = mongoose.Schema({
    fromUserId: mongoose.SchemaTypes.ObjectId,
    toUserId: mongoose.SchemaTypes.ObjectId
});

module.exports = mongoose.model("subscribes", SubsribeSchema);
