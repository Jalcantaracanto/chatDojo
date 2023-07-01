const express = require('express')
const app = express()
const port = 8080
const cors = require('cors')
const cookieParser = require('cookie-parser')
const path = require('path')
const server = require('http').createServer(app)
const io = require('socket.io')(server, {
    cors: {
        origin: 'http://localhost:3000',
    },
})

let activeUsers = []

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
})

require('./server/config/mongoose.config')
require('dotenv').config()

app.use(cookieParser())
app.use(cors({ credentials: true, origin: 'http://localhost:3000' }))
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

// Importar rutas
require('./server/routes/user.routes')(app)
require('./server/routes/chat.routes')(app)
require('./server/routes/message.routes')(app)

server.listen(port, () => console.log(`Listening on port ${port}`))
