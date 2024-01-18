const express = require("express");
const routes = express.Router();
const userCtrl = require("../controllers/user");
const auth = require('../middleware/auth');


routes.get("/profile",auth, userCtrl.getPersonalInfo);
routes.get("/:id",auth, userCtrl.getUserById);

module.exports = routes;