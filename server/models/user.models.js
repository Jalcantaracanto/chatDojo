const { Schema, model } = require('mongoose')
const bcrypt = require('bcrypt')

const UserSchema = new Schema(
    {
        nickname: {
            type: String,
            required: [true, 'El nickname es requerido'],
            trim: true,
            unique: [true, 'El nickname ya existe'],
        },
        email: {
            type: String,
            trim: true,
            required: [true, 'El email es requerido'],
            unique: [true, 'El email ya existe'],
        },
        password: {
            type: String,
            required: [true, 'La contraseña es requerida'],
        },
    },
    { timestamps: true }
)

UserSchema.virtual('confirmPassword')
    .get(() => this._confirmPassword)
    .set((value) => (this._confirmPassword = value))

UserSchema.pre('validate', function (next) {
    if (this.password !== this.confirmPassword) {
        this.invalidate('confirmPassword', 'Las contraseñas deben ser iguales')
    }
    next()
})

UserSchema.pre('save', function (next) {
    bcrypt.hash(this.password, 10).then((hash) => {
        this.password = hash
        next()
    })
})

const User = model('User', UserSchema)

module.exports = User
