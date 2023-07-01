const { createChat, userChats, findChat } = require('../controllers/chat.controller')

module.exports = (app) => {
    app.post('/chats', createChat)
    app.get('/chats/:userId', userChats)
    app.get('/chats/find/:firstID/:secondID', findChat)
}
