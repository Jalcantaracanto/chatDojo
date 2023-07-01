import React, { useState, useContext } from 'react'
import { login } from '../services/user.service'
import { useNavigate, Link } from 'react-router-dom'
import Cookies from 'js-cookie'
import { UserContext } from '../context/UserProvider'

//MUI
import Alert from '@mui/material/Alert'
import Input from '@mui/material/Input'
import IconButton from '@mui/material/IconButton'
import InputLabel from '@mui/material/InputLabel'
import InputAdornment from '@mui/material/InputAdornment'
import FormControl from '@mui/material/FormControl'
import TextField from '@mui/material/TextField'
import Visibility from '@mui/icons-material/Visibility'
import VisibilityOff from '@mui/icons-material/VisibilityOff'
import Button from '@mui/material/Button'
import ExitToAppIcon from '@mui/icons-material/ExitToApp'
import Checkbox from '@mui/material/Checkbox'

const isEmail = (email) => {
    const re = /\S+@\S+\.\S+/
    return re.test(email)
}

export const Login = () => {
    // password field
    const [showPassword, setShowPassword] = React.useState(false)

    const handleClickShowPassword = () => setShowPassword((show) => !show)

    const handleMouseDownPassword = (event) => {
        event.preventDefault()
    }

    //remebember me
    const [rememberMe, setRememberMe] = useState(false)

    const { setUsuario } = useContext(UserContext)
    const navigate = useNavigate()
    const [user, setUser] = useState({
        email: '',
        password: '',
    })

    //ERROR

    const [emailError, setEmailError] = useState(false)
    const [passwordError, setPasswordError] = useState(false)

    //form validity
    const [formValid, setFormValid] = useState()
    const [formSuccess, setFormSuccess] = useState(false)

    //validaciones
    const handleEmailError = (e) => {
        const { name, value } = e.target
        if (!isEmail(value)) {
            setEmailError(true)
        } else {
            setEmailError(false)
        }
        setUser({
            ...user,
            [name]: value,
        })
    }

    const handlePasswordError = (e) => {
        const { name, value } = e.target
        if (value.length < 3) {
            setPasswordError(true)
        } else {
            setPasswordError(false)
        }
        setUser({
            ...user,
            [name]: value,
        })
    }

    const onchangeHandler = (e) => {
        const { name, value } = e.target
        setUser({
            ...user,
            [name]: value,
        })
    }
    console.log(user)

    console.log(rememberMe)

    const handleSubmit = (e) => {
        e.preventDefault()
        setFormSuccess(null)
        if (!isEmail(user.email)) {
            setFormValid('El email no es válido')
            return
        }
        if (user.password.length < 3 || !user.password) {
            setFormValid('La contraseña debe tener al menos 3 caracteres')
            return
        }
        setFormValid(false)
        setFormSuccess('Iniciando sesión...')
        login(user)
            .then((response) => {
                console.log(response)
                const userToken = Cookies.get('usertoken')
                if (userToken) {
                    const decodedToken = decodeURIComponent(escape(atob(userToken.split('.')[1])))
                    const { id, nickname, email } = JSON.parse(decodedToken)

                    setUsuario({
                        id: id,
                        nickname: nickname,
                        email: email,
                    })
                }
                navigate('/chat')
            })
            .catch((error) => {
                console.log(error)
                console.log(error.response.data.msg)
                setFormSuccess(null)
                setFormValid(error.response.data.msg)
            })
    }

    return (
        <div>
            <h1>Login</h1>
            <p>
                <TextField id="standard-basic" label="Email:" variant="standard" fullWidth size="small" name="email" onChange={onchangeHandler} error={emailError} onBlur={handleEmailError} />
            </p>
            <p>
                <FormControl sx={{ width: '100%' }} variant="standard">
                    <InputLabel error={passwordError} htmlFor="standard-adornment-password">
                        Password
                    </InputLabel>
                    <Input
                        fullWidth
                        error={passwordError}
                        name="password"
                        onChange={onchangeHandler}
                        onBlur={handlePasswordError}
                        id="standard-adornment-password"
                        type={showPassword ? 'text' : 'password'}
                        endAdornment={
                            <InputAdornment position="end">
                                <IconButton aria-label="toggle password visibility" onClick={handleClickShowPassword} onMouseDown={handleMouseDownPassword}>
                                    {showPassword ? <VisibilityOff /> : <Visibility />}
                                </IconButton>
                            </InputAdornment>
                        }
                    />
                </FormControl>
            </p>
            <div align="left">
                <Checkbox onChange={(e) => setRememberMe(e.target.checked)} inputProps={{ 'aria-label': 'controlled' }} />
                Remember me
            </div>
            <p>
                <Button variant="contained" startIcon={<ExitToAppIcon />} fullWidth onClick={handleSubmit}>
                    Entrar
                </Button>
            </p>
            <small align="left">
                Do you have an account? <Link to="/register">register</Link>
            </small>
            <p>{formValid && <Alert severity="error">{formValid}</Alert>}</p>
            <p>{formSuccess && <Alert severity="success">{formSuccess}</Alert>}</p>
            {/* <form onSubmit={handleSubmit}>
                <label>Email:</label>
                <input type="email" placeholder="Email" name="email" onChange={onchangeHandler} />
                <label>Password:</label>
                <input type="password" placeholder="Password" name="password" onChange={onchangeHandler} />
                <button type="submit">Login</button>
            </form> */}
        </div>
    )
}
