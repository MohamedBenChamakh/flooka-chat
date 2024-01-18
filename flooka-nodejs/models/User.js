const mongoose = require("mongoose");
const uniqueValidator = require("mongoose-unique-validator");

const userSchema = mongoose.Schema({
  username: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  phone: { type: Number, required: true, unique: true },
  picture: { type: String},
  gender: { type: String, required: true },
  age: { type: Date, required: true },
  password: { type: String, required: true },
  country: { type: String , required: true},
  createdAt: { type: Date, required: true },
});

userSchema.plugin(uniqueValidator);

module.exports = mongoose.model("User", userSchema);