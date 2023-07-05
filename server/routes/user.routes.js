const { register, login, logout, findUser, findAllUsers, updateUser, addContact, deleteUser } = require('../controllers/user.controller')
const multer = require('multer')
const path = require('path')
const { v4: uuidv4 } = require('uuid')

const storage = multer.diskStorage({
    destination: path.join(__dirname, '../uploads/'), // Ruta absoluta al directorio "uploads"
    filename: (req, file, cb) => {
        const extension = path.extname(file.originalname)
        const nombreArchivo = `${uuidv4()}${extension}`
        cb(null, nombreArchivo)
    },
})

const upload = multer({ storage })

module.exports = (app) => {
    app.post('/user/register', register)
    app.post('/user/login', login)
    app.post('/user/logout', logout)
    app.get('/user/:id', findUser)
    app.get('/users', findAllUsers)
    app.put('/user/:id', upload.single('imagen'), updateUser)
    app.delete('/user/:id', deleteUser)
    app.put('/user/addContact/:id', addContact)
}
