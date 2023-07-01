import React from 'react'
import Styles from '../styles/Forms.module.sass'
import { Register } from '../components/Register'
import { Login } from '../components/Login'

//material ui import
import Paper from '@mui/material/Paper'
import Chip from '@mui/material/Chip'
import FaceIcon from '@mui/icons-material/Face'
import LockIcon from '@mui/icons-material/Lock'
import Switch from '@mui/material/Switch'

export const Forms = () => {
    const [checked, setChecked] = React.useState(false)

    const handleChange = (event) => {
        setChecked(event.target.checked)
    }
    return (
        <div className={Styles.container}>
            <Paper elevation={3} style={{ padding: '10px' }}>
                {checked ? <Chip icon={<FaceIcon />} label="Sign Up" color="primary" variant="outlined" /> : <Chip icon={<LockIcon />} label="Login" color="primary" variant="outlined" />}
                <br />
                <Switch checked={checked} onChange={handleChange} inputProps={{ 'aria-label': 'controlled' }} />
                <br />
                {checked ? <Register /> : <Login />}
            </Paper>
        </div>
    )
}
