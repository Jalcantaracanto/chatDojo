const { register, login, logout, findUser, findAllUsers, updateUser, addContact, deleteUser } = require('../controllers/user.controller')

module.exports = (app) => {
    app.post('/user/register', register)
    app.post('/user/login', login)
    app.post('/user/logout', logout)
    app.get('/user/:id', findUser)
    app.get('/users', findAllUsers)
    app.put('/user/:id', updateUser)
    app.delete('/user/:id', deleteUser)
    app.put('/user/:id', addContact)
}
