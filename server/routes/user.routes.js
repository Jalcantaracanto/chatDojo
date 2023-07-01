const { register, login, logout, findUser, findAllUsers, updateUser } = require('../controllers/user.controller')

module.exports = (app) => {
    app.post('/user/register', register)
    app.post('/user/login', login)
    app.post('/user/logout', logout)
    app.get('/user/:id', findUser)
    app.get('/users', findAllUsers)
    app.put('/user/:id', updateUser)
}
