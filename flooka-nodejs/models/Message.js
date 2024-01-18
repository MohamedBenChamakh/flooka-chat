const mongoose = require("mongoose");
const uniqueValidator = require("mongoose-unique-validator");

const messageSchema = mongoose.Schema({
    sender: { type: String, required: true },
    roomId: { type: String, required: true },
    content: {type: String, required: true},
    createdAt: { type: Date, required: true },
});

messageSchema.plugin(uniqueValidator);

module.exports = mongoose.model("Message", messageSchema);