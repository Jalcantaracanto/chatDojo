const { Schema, model } = require('mongoose')

const chatSchema = new Schema(
    {
        members: {
            type: Array,
        },
    },
    { timestamps: true }
)

const Chat = model('Chat', chatSchema)

module.exports = Chat
