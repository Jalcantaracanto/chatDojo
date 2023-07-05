import React, { useState } from 'react';
import { registro } from '../services/user.service'
import { useNavigate } from 'react-router-dom';

//MUI
import Alert from '@mui/material/Alert';
import Input from '@mui/material/Input';
import IconButton from '@mui/material/IconButton';
import InputLabel from '@mui/material/InputLabel';
import InputAdornment from '@mui/material/InputAdornment';
import FormControl from '@mui/material/FormControl';
import TextField from '@mui/material/TextField';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import Button from '@mui/material/Button';
import ExitToAppIcon from '@mui/icons-material/ExitToApp';
import { checkFalse } from '../views/Forms'

const isEmail = (email) => {
    const re = /\S+@\S+\.\S+/;
    return re.test(email);
};

export const Register = ({checkFalse}) => {
    // password field
    const [showPassword, setShowPassword] = React.useState(false);

    const handleClickShowPassword = () => setShowPassword((show) => !show);

    const handleMouseDownPassword = (event) => {
        event.preventDefault();
    };

    const navigate = useNavigate();

    const [user, setUser] = useState({
        nickname: '',
        email: '',
        password: '',
        confirmPassword: '',
        imagen: {}

    });
    //ERROR
    const [nicknameError, setNicknameError] = useState(false);
    const [emailError, setEmailError] = useState(false);
    const [passwordError, setPasswordError] = useState(false);
    const [confirmPasswordError, setConfirmPasswordError] = useState(false);

    //form validity
    const [formValid, setFormValid] = useState();
    const [formSuccess, setFormSuccess] = useState(false);

    //validaciones
    const handleNicknameError = (e) => {
        const { name, value } = e.target;
        if (value.length < 3) {
            setNicknameError(true);
        } else {
            setNicknameError(false);
        }
        setUser({
            ...user,
            [name]: value
        });
    };
    const handleEmailError = (e) => {
        const { name, value } = e.target;
        if (!isEmail(value)) {
            setEmailError(true);
        } else {
            setEmailError(false);
        }
        setUser({
            ...user,
            [name]: value
        });
    };
    const handlePasswordError = (e) => {
        const { name, value } = e.target;
        if (value.length < 3) {
            setPasswordError(true);
        } else {
            setPasswordError(false);
        }
        setUser({
            ...user,
            [name]: value
        });
    };
    const handleConfirmPasswordError = (e) => {
        const { name, value } = e.target;
        if (value.length < 3) {
            setConfirmPasswordError(true);
        } else {
            setConfirmPasswordError(false);
        }
        setUser({
            ...user,
            [name]: value
        });
    };


    const onchangeHandler = (e) => {
        const { name, value } = e.target;
        setUser({
            ...user,
            [name]: value
        });
    };
    console.log(user)

    const handleSubmit = (e) => {
        e.preventDefault();
        setFormSuccess(null);
        if (nicknameError || !user.nickname) {
            setFormValid("El nickname debe tener al menos 3 caracteres");
            return;
        }
        if (!isEmail(user.email)) {
            setFormValid('El email no es válido');
            return;
        }
        if (user.password.length < 3 || !user.password) {
            setFormValid('La contraseña debe tener al menos 3 caracteres');
            return;
        }
        if (user.password !== user.confirmPassword) {
            setFormValid('Las contraseñas no coinciden');
            return;
        }
        setFormValid(false);
        setFormSuccess("Registro exitoso");
        registro(user)
            .then((response) => {
                console.log(response)
                checkFalse()
            })
            .catch((error) => {
                console.log(error)
                setFormSuccess(false);
                setFormValid(error.response.data.error)
            })
    }

    return (
        <div>
            <h1>Register</h1>

            <p>
                <TextField
                required
                    //id="standard-basic"
                    label="Nickname:"
                    variant="standard"
                    fullWidth
                    size='small'
                    name='nickname'
                    onChange={onchangeHandler}
                    error={nicknameError}
                    onBlur={handleNicknameError}
                />
            </p>
            <p>
                <TextField
                    //id="standard-basic"
                    required
                    label="Email:"
                    variant="standard"
                    fullWidth
                    size='small'
                    name='email'
                    onChange={onchangeHandler}
                    error={emailError}
                    onBlur={handleEmailError}
                />
            </p>
            <p>
                <FormControl sx={{ width: '100%' }} variant="standard">
                    <InputLabel error={passwordError} htmlFor="standard-adornment-password">Password</InputLabel>
                    <Input
                        fullWidth
                        required
                        error={passwordError}
                        name='password'
                        onChange={onchangeHandler}
                        onBlur={handlePasswordError}
                        //id="standard-adornment-password"
                        type={showPassword ? 'text' : 'password'}
                        endAdornment={
                            <InputAdornment position="end">
                                <IconButton
                                    aria-label="toggle password visibility"
                                    onClick={handleClickShowPassword}
                                    onMouseDown={handleMouseDownPassword}
                                >
                                    {showPassword ? <VisibilityOff /> : <Visibility />}
                                </IconButton>
                            </InputAdornment>
                        }
                    />
                </FormControl>
            </p>
            <p>
                <FormControl sx={{ width: '100%' }} variant="standard">
                    <InputLabel error={confirmPasswordError} htmlFor="standard-adornment-password">Confirm Password</InputLabel>
                    <Input
                        fullWidth
                        required
                        error={confirmPasswordError}
                        name='confirmPassword'
                        onChange={onchangeHandler}
                        onBlur={handleConfirmPasswordError}
                        //id="standard-adornment-password"
                        type={showPassword ? 'text' : 'password'}
                        endAdornment={
                            <InputAdornment position="end">
                                <IconButton
                                    aria-label="toggle password visibility"
                                    onClick={handleClickShowPassword}
                                    onMouseDown={handleMouseDownPassword}
                                >
                                    {showPassword ? <VisibilityOff /> : <Visibility />}
                                </IconButton>
                            </InputAdornment>
                        }
                    />
                </FormControl>
            </p>
            <p>
                <Button
                    variant="contained"
                    startIcon={<ExitToAppIcon />}
                    fullWidth
                    onClick={handleSubmit}
                >
                    registrarse
                </Button>
            </p>
            <p>
                {formValid &&
                    <Alert severity="error">{formValid}</Alert>
                }
            </p>
            <p>
                {formSuccess &&
                    <Alert severity="success">{formSuccess}</Alert>
                }
            </p>
            {/* <form onSubmit={handleSubmit}>
                <label>Nickname:</label>
                <input
                    type="text"
                    placeholder="nickname"
                    name='nickname'
                    onChange={onchangeHandler}
                />
                <label>Email:</label>
                <input
                    type="email"
                    placeholder="Email"
                    name='email'
                    onChange={onchangeHandler}
                />
                <label >Password:</label>
                <input
                    type="password"
                    placeholder="Password"
                    name='password'
                    onChange={onchangeHandler}
                />
                <label >Confirm Password:</label>
                <input
                    type="password"
                    placeholder="Confirm Password"
                    name='confirmPassword'
                    onChange={onchangeHandler}
                />
                <button type="submit">Register</button>
            </form>

            <button onClick={() => navigate('/login')}>Login</button> */}

        </div>
    );
};
