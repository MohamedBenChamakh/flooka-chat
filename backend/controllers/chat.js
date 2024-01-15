const Room = require("../models/Room");
const User = require("../models/User");
const Message = require("../models/Message");
const jwtManager = require("../utils/jwt-manager")

exports.createRoom = (req, res) => {
    const userId = jwtManager.extractFromToken(req.headers.authorization, "userId");
    Room.find({ members: { $in: [userId] } }).then(rooms => {
        let usersId = rooms.reduce((acc, room) => {
            acc.push(...room.members.filter(memberId => memberId !== userId));
            return acc;
        }, []);
        User.findOne({
            _id: { $nin: [userId, ...usersId] },
            country: req.body.country,
            age: {
                $gte: req.body.age.lower,
                $lte: req.body.age.upper
            },
            gender: req.body.gender
        }).then((user) => {
            if (user != null) {
                const room = new Room({
                    members: [userId, user._id],
                    createdAt: new Date()
                })
                room.save().then((result) => res.status(201).json(result))
            } else {
                res.status(400).json({ message: "room could not be created" })
            }
        }).catch(err=> console.log(err))
    }).catch(err=> console.log(err))

}


exports.getRoomsByUserId = (req, res) => {
    const userId = jwtManager.extractFromToken(req.headers.authorization, "userId");
    Room.find({ members: { $in: [userId] } }).then(rooms => {
        if (rooms) res.status(200).json(rooms);
        else {
            res.status(404).json({ message: "rooms are not found" })
        }
    }).catch(error => res.status(500).json({ message: "error fetching rooms" }));
}

exports.getRoomById = (req, res) => {
    Room.findOne({ _id: req.params.id }).then(room => {
        if (room) {
            return res.status(200).json(room);
        } else {
            return res.status(404).json({ message: "room not found" })
        }
    }).catch(error => res.status(500).json({ message: "error while fetching room" }))
}


exports.sendMessage = (req, res) => {
    const userId = jwtManager.extractFromToken(req.headers.authorization, "userId");
    Room.findOne({ _id: req.body.roomId, members: { $in: [userId] } }).then(
        (room) => {
            if (room) {
                const message = new Message({
                    sender: userId,
                    roomId: req.body.roomId,
                    content: req.body.content,
                    createdAt: new Date()
                });
                message.save().then(msg => res.status(200).json(msg));
            } else {
                res.status(403).json({ message: "you're not authorized to perform request in this room" })
            }
        }
    ).catch(error => res.status(500).json({ message: "error while performing the request" }));
}


exports.getMessagesByRoomId = (req, res) => {
    Message.find({ roomId: req.params.id }).then(messages => {
        if (messages) {
            return res.status(200).json(messages);
        } else {
            return res.status(404).json({ message: "no message related to this room is found" });
        }
    }).catch(error => res.status(500).json({ message: "error while performing the request" }));

}