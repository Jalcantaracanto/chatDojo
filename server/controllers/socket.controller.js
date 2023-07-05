const socket = require('socket.io')

const getUserFromController = require('../controllers/user.controller')

let activeUsers = []

module.exports.socketEvents = (server) => {
    const io = socket(server, { cors: true })

    io.on('connection', (socket) => {
        socket.on('newUser', (newUserId) => {
            if (!activeUsers.some((user) => user.user === newUserId)) {
                activeUsers.push({ userId: newUserId, socketId: socket.id })
            } 
            io.emit('getUsers', activeUsers)
        })

        socket.on('sendMessage', (data) => {
            const { receiverId } = data
            const user = activeUsers.find((user) => user.userId === receiverId)
            console.log('Sending from socket to:', receiverId)
            console.log('Data: ', data)
            if (user) {
                io.to(user.socketId).emit('receiveMessage', data)
            }
        })

        socket.on('disconnect', () => {
            activeUsers = activeUsers.filter((user) => user.socketId !== socket.id)
            io.emit('getUsers', activeUsers)
        })

        socket.on('newMessage', (message) => {
            io.emit('getMessage', message)
        })

        io.emit('users_from_server', )
    })
}