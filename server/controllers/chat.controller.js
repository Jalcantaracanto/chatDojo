const Chat = require('../models/chat.models')

module.exports.createChat = (req, res) => {
    Chat.create({ members: [req.body.senderId, req.body.receiverId] })
        .then((result) => {
            res.json({ chat: result })
        })
        .catch((error) => {
            console.error(error)
            res.status(500).json({ error: error })
        })
}

module.exports.userChats = (req, res) => {
    Chat.find({ members: { $in: [req.params.userId] } })
        .then((chats) => {
            res.status(200).json({ chat: chats })
        })
        .catch((error) => {
            res.status(500).json({ error: error })
        })
}

module.exports.findChat = (req, res) => {
    Chat.findOne({
        members: { $all: [req.params.firstID, req.params.secondID] },
    })
        .then((chat) => {
            res.status(200).json({ chat: chat })
        })
        .catch((error) => {
            res.status(500).json({ error: error })
        })
}

module.exports.deleteChat = (req, res) => {
    Chat.deleteOne({ _id: req.params.id })
        .then((result) => {
            res.status(200).json({ result: result })
        })
        .catch((error) => {
            res.status(500).json({ error: error })
        })
}
