const mongoose = require("mongoose");
const uniqueValidator = require("mongoose-unique-validator");


const roomSchema = mongoose.Schema({
  members: { type: [String], required: true },
  createdAt: { type: Date, required: true },
});

roomSchema.plugin(uniqueValidator);
module.exports = mongoose.model("Room", roomSchema);