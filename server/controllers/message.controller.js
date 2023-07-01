const Message = require('../models/message.models')

module.exports.addMessage = (req, res) => {
    const { chatId, senderId, text } = req.body

    Message.create({ chatId, senderId, text })
        .then((result) => {
            res.status(200).json({ message: result })
        })
        .catch((error) => {
            console.error(error)
            res.status(500).json({ error: error })
        })
}

module.exports.getMessages = (req, res) => {
    const { chatId } = req.params

    Message.find({ chatId })
        .then((result) => {
            res.status(200).json({ message: result })
        })
        .catch((error) => {
            console.error(error)
            res.status(500).json({ error: error })
        })
}
