const User = require('../models/user.models')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const Chat = require('../models/chat.models')

module.exports.register = (req, res) => {
    User.create(req.body)
        .then((newUser) => res.json({ user: newUser }))
        .catch((err) => {
            console.log(err)
            res.status(500).json({ error: err })
        })
}

module.exports.login = (req, res) => {
    const { email, password } = req.body

    User.findOne({ email }).then((user) => {
        if (user === null) {
            return res.status(400).json({ msg: 'Correo o contraseña incorrectos' })
        } else {
            bcrypt
                .compare(password, user.password)
                .then((isValid) => {
                    if (isValid) {
                        const userToken = jwt.sign(
                            {
                                id: user._id,
                                email: user.email,
                                nickname: user.nickname,
                            },
                            process.env.SECRET_KEY
                        )
                        res.cookie('usertoken', userToken, process.env.SECRET_KEY, {
                            httpOnly: true,
                        }).json({ msg: 'Conexión Exitosa!' })
                    } else {
                        res.status(403).json({ msg: 'Correo o contraseña incorrectos' })
                    }
                })
                .catch((err) => res.status(400).json({ msg: 'Correo o contraseña incorrectos', error: err }))
        }
    })
}

module.exports.logout = (req, res) => {
    User.findOne({ email: req.body.email })
        .then((user) => {
            res.clearCookie('usertoken')
            res.json({ msg: 'Usuario desconectado' })
        })
        .catch((err) => res.json({ msg: 'Error al desconectar usuario', error: err }))
}

module.exports.findUser = (req, res) => {
    User.findOne({ _id: req.params.id })
        .select({ password: 0 })
        .then((user) => res.json({ user }))
        .catch((err) => res.json({ message: 'Error al buscar usuario', error: err }))
}

module.exports.findAllUsers = (req, res) => {
    User.find()
        .select({ password: 0 })
        .then((users) => res.json({ users }))
        .catch((err) => res.json({ message: 'Error al buscar usuarios', error: err }))
}

module.exports.updateUser = (req, res) => {
    User.findOneAndUpdate({ _id: req.params.id }, req.body, { new: true })
        .then((updatedUser) => res.json({ user: updatedUser }))
        .catch((err) => res.json({ message: 'Error al actualizar usuario', error: err }))
}

/* module.exports.deleteUser = (req, res) => {
    User.deleteOne({ _id: req.params.id })
        .then((user) => res.json({ user: user }))
        .catch((err) => res.json({ error: err }))
} */
module.exports.deleteUser = (req, res) => {
    const userId = req.params.id

    User.deleteOne({ _id: userId })
        .then(() => {
            // Eliminar al usuario eliminado de la lista de contactos de los demás usuarios
            User.updateMany({ contactos: userId }, { $pull: { contactos: userId } })
                .then(() => res.json({ msg: 'Usuario eliminado correctamente' }))
                .catch((err) => res.status(500).json({ error: err }))
        })
        .catch((err) => res.status(500).json({ error: err }))
}

module.exports.findUserByEmail = (req, res) => {
    User.findOne({ email: req.params.email })
        .then((user) => res.json({ user }))
        .catch((err) => res.json({ message: 'Error al buscar usuario', error: err }))
}

// module.exports.addContact = (req, res) => {
//     console.log(req.body)
//     const contactId = req.body.contactos[req.body.contactos.length - 1]

//     User.findOneAndUpdate({ _id: req.params.id, contactos: { $ne: req.body.contactos } }, { $push: { contactos: contactId } }, { new: true })
//         .then((updatedUser) => {
//             // Llama a createChat pasando los IDs
//             Chat.create({ members: [req.params.id, contactId] })
//                 .then((result) => {
//                     res.status(200).json({ chat: result })
//                 })
//                 .catch((error) => {
//                     console.error(error)
//                     res.status(500).json({ error: error })
//                 })
//         })
//         .catch((err) => res.json({ message: 'Error al actualizar usuario', error: err }))
// }

module.exports.addContact = (req, res) => {
    console.log(req.body)
    const contactId = req.body.contactos[req.body.contactos.length - 1]

    User.findOneAndUpdate({ _id: req.params.id, contactos: { $ne: req.body.contactos } }, { $push: { contactos: contactId } }, { new: true })
        .then((updatedUser) => {
            // Verificar si ya existe un chat con los mismos miembros
            Chat.findOne({ members: { $all: [req.params.id, contactId] } })
                .then((existingChat) => {
                    if (existingChat) {
                        // Ya existe un chat con los mismos miembros
                        res.status(200).json({ chat: existingChat })
                    } else {
                        // No existe un chat, crear uno nuevo
                        Chat.create({ members: [req.params.id, contactId] })
                            .then((newChat) => {
                                res.status(200).json({ chat: newChat })
                            })
                            .catch((error) => {
                                console.error(error)
                                res.status(500).json({ error: error })
                            })
                    }
                })
                .catch((error) => {
                    console.error(error)
                    res.status(500).json({ error: error })
                })
        })
        .catch((err) => res.json({ message: 'Error al actualizar usuario', error: err }))
}
