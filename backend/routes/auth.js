const express = require("express");
const routes = express.Router();
const authCtrl = require("../controllers/auth");


routes.post("/login", authCtrl.login);
routes.post("/signup", authCtrl.signup);

module.exports = routes;