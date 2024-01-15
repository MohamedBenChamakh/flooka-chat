const User = require("../models/User");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

exports.login = (req, res) => {
  User.findOne({ username: req.body.username })
    .then((user) => {
      if (!user) {
        return res.status(401).json({ message: "user not found" });
      }
      bcrypt
        .compare(req.body.password, user.password)
        .then((valid) => {
          if (!valid) {
            return res.status(401).json({ message: "incorrect password" });
          }
          res.status(200).json({
            userId: user._id,
            token: jwt.sign({ userId: user._id }, "RANDOM_TOKEN_SECRET", {
              expiresIn: "24h",
            }),
          });
        })
        .catch((error) => res.status(500).json({ message: "error while login" }));
    })
    .catch((error) => res.status(500).json({ message: "error while login" }));
};

exports.signup = (req, res) => {
  bcrypt
    .hash(req.body.password, 10)
    .then((hash) => {
      const user = new User({
        username: req.body.username,
        email: req.body.email,
        phone: req.body.phone,
        picture: req.body.picture,
        gender: req.body.gender,
        country: req.body.country,
        age: req.body.age,
        password: hash,
        createdAt: new Date() ,
      });
      user
        .save()
        .then(() => res.status(201).json({ message: "user created" }))
        .catch((error) =>{
          console.log(error);
          res.status(400).json({ message: "error while creating user " })
        }
        );
    })
    .catch((error) =>
      res.status(500).json({ message: "error while creating user" })
    );
};