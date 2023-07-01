const { Schema, model } = require('mongoose')

const messageSchema = new Schema(
    {
        chatId: {
            type: String,
        },
        senderId: {
            type: String,
        },
        text: {
            type: String,
        },
    },
    { timestamps: true }
)

const Message = model('Message', messageSchema)
module.exports = Message
