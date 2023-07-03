const User = require('../models/user.models')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

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

module.exports.findUserByEmail = (req, res) => {
    User.findOne({ email: req.params.email })
        .then((user) => res.json({ user }))
        .catch((err) => res.json({ message: 'Error al buscar usuario', error: err }))
}

module.exports.addContact = (req, res) => {
    User.findOneAndUpdate(
        { _id: req.params.id, contactos: { $ne: req.body.contactos } }, // Evita duplicados usando $ne
        { $push: { contactos: req.body.contactos } },
        { new: true }
    )
        .then((updatedUser) => res.json({ user: updatedUser }))
        .catch((err) => res.json({ message: 'Error al actualizar usuario', error: err }))
}
