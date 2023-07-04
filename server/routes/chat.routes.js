const { createChat, userChats, findChat, deleteChat } = require('../controllers/chat.controller')

module.exports = (app) => {
    app.post('/chats', createChat)
    app.get('/chats/:userId', userChats)
    app.get('/chats/find/:firstID/:secondID', findChat)
    app.delete('/chats/:id', deleteChat)
}
