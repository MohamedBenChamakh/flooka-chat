const express = require('express');
const app = express();
const bodyParser = require("body-parser");
app.use(bodyParser.json())

const authRoutes = require("./routes/auth");
const chatRoutes = require("./routes/chat");
const userRoutes = require("./routes/user");

app.use("/api/auth", authRoutes);
app.use("/api/chatrooms", chatRoutes);
app.use("/api/user", userRoutes);

module.exports = app;