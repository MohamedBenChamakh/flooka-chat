const User = require("../models/User");
const jwtManager = require("../utils/jwt-manager");

exports.getUserById = (req, res) => {
    const userId = req.params.id;
    User.findOne({ _id: userId }).then(user => {
        if (user) {
            return res.status(200).json({ _id: user._id, username: user.username, picture: user.picture });
        } else {
            return res.status(404).json({ message: "user with _id " + userId + " not found" });
        }
    }).catch(error => res.status(500).json({ message: "error while fetching user " }));
}


exports.getPersonalInfo = (req, res) => {
    const userId = jwtManager.extractFromToken(req.headers.authorization, "userId");
    User.findOne({ _id: userId }).select('-password').then(user => {
        if (user) {
            return res.status(200).json(user);
        } else {
            return res.status(404).json({ message: "user with _id " + userId + " not found" });
        }
    }).catch(error => res.status(500).json({ message: "error while fetching user " }));
}