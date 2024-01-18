const express = require("express");
const routes = express.Router();
const chatCtrl = require("../controllers/chat");
const auth = require('../middleware/auth');

routes.get("/",auth, chatCtrl.getRoomsByUserId);
routes.post("/",auth,chatCtrl.createRoom);
routes.post("/message",auth,chatCtrl.sendMessage);
routes.get("/:id",auth,chatCtrl.getRoomById);
routes.get("/:id/message",auth,chatCtrl.getMessagesByRoomId);


module.exports = routes;