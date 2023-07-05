import React, { useContext, useEffect, useState } from 'react'
import { UserContext } from '../context/UserProvider'
import Cookies from 'js-cookie'
import { logout, getUser } from '../services/user.service'
import { useNavigate } from 'react-router-dom'
import { Update } from './Update'

// Material UI
import AppBar from '@mui/material/AppBar'
import Box from '@mui/material/Box'
import Toolbar from '@mui/material/Toolbar'
import IconButton from '@mui/material/IconButton'
import Typography from '@mui/material/Typography'
import Menu from '@mui/material/Menu'
import MenuIcon from '@mui/icons-material/Menu'
import Container from '@mui/material/Container'
import Avatar from '@mui/material/Avatar'
import Button from '@mui/material/Button'
import Tooltip from '@mui/material/Tooltip'
import MenuItem from '@mui/material/MenuItem'
import AdbIcon from '@mui/icons-material/Adb'
import VideogameAssetIcon from '@mui/icons-material/VideogameAsset'
import { set } from 'mongoose'
import { Dialog } from '@mui/material'

// const pages = ['Products', 'Pricing', 'Blog']
const settings = ['Profile', 'Subir Imagen', 'Logout']

export const Navbar = () => {
    const [anchorElNav, setAnchorElNav] = useState(null)
    const [anchorElUser, setAnchorElUser] = useState(null)
    const [user, setUser] = useState(null)
    const [showInitial, setShowInitial] = useState(false)
    const [openUpdatePopup, setOpenUpdatePopup] = useState(false);


    const { usuario, clearLocalStorage } = useContext(UserContext)
    console.log(usuario)
    const navigate = useNavigate()

    const getUserFromService = () => {
        if (usuario) {
            getUser(usuario.id)
                .then((response) => {
                    console.log(response)
                    setUser(response.data.user)
                    response.data.user?.imagen?.path ? setShowInitial(true) : setShowInitial(false)
                })
                .catch((error) => {
                    console.log(error)
                })
        }
    }
    //windows
    /* const corteImagen = () => {
        const ruta = user?.imagen?.path
        const cortar = ruta?.split('\\').slice(-1)[0]

        return cortar
    } */

    //mac
    const corteImagen = () => {
        const ruta = user?.imagen?.path;
        const cortar = ruta?.split('/').slice(-1)[0];

        return cortar;
    };

    console.log(corteImagen())

    const handleOpenNavMenu = (event) => {
        setAnchorElNav(event.currentTarget)
    }
    const handleOpenUserMenu = (event) => {
        setAnchorElUser(event.currentTarget)
    }

    const handleCloseNavMenu = () => {
        setAnchorElNav(null)
    }

    const handleCloseUserMenu = () => {
        setAnchorElUser(null)
    }

    const handleOpenUpdatePopup = () => {
        setOpenUpdatePopup(true);
    };

    //LOGOUT
    const desconectar = () => {
        logout()
            .then((response) => {
                Cookies.remove('usertoken')
                clearLocalStorage()
                navigate('/')
            })
            .catch((error) => {
                console.log(error)
            })
    }

    useEffect(() => {
        getUserFromService()
    }, [usuario])

    return (
        <AppBar position="static" /* sx={{ backgroundColor: 'blue' }} */>
            <Container maxWidth="xl">
                <Toolbar disableGutters>
                    <VideogameAssetIcon sx={{ display: { xs: 'none', md: 'flex' }, mr: 1 }} />
                    <Typography
                        variant="h6"
                        noWrap
                        component="a"
                        href="/"
                        sx={{
                            mr: 2,
                            display: { xs: 'none', md: 'flex' },
                            fontFamily: 'monospace',
                            fontWeight: 700,
                            letterSpacing: '.3rem',
                            color: 'inherit',
                            textDecoration: 'none',
                        }}
                    >
                        SUPER CHAT
                    </Typography>

                    <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
                        <IconButton size="large" aria-label="account of current user" aria-controls="menu-appbar" aria-haspopup="true" onClick={handleOpenNavMenu} color="inherit">
                            <MenuIcon />
                        </IconButton>
                        <Menu
                            id="menu-appbar"
                            anchorEl={anchorElNav}
                            anchorOrigin={{
                                vertical: 'bottom',
                                horizontal: 'left',
                            }}
                            keepMounted
                            transformOrigin={{
                                vertical: 'top',
                                horizontal: 'left',
                            }}
                            open={Boolean(anchorElNav)}
                            onClose={handleCloseNavMenu}
                            sx={{
                                display: { xs: 'block', md: 'none' },
                            }}
                        >
                            {/* {pages.map((page) => (
                                <MenuItem key={page} onClick={handleCloseNavMenu}>
                                    <Typography textAlign="center">{page}</Typography>
                                </MenuItem>
                            ))} */}
                        </Menu>
                    </Box>
                    <AdbIcon sx={{ display: { xs: 'flex', md: 'none' }, mr: 1 }} />
                    <Typography
                        variant="h5"
                        noWrap
                        component="a"
                        href=""
                        sx={{
                            mr: 2,
                            display: { xs: 'flex', md: 'none' },
                            flexGrow: 1,
                            fontFamily: 'monospace',
                            fontWeight: 700,
                            letterSpacing: '.3rem',
                            color: 'inherit',
                            textDecoration: 'none',
                        }}
                    >
                        LOGO
                    </Typography>
                    <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
                        {/*  {pages.map((page) => (
                            <Button key={page} onClick={handleCloseNavMenu} sx={{ my: 2, color: 'white', display: 'block' }}>
                                {page}
                            </Button>
                        ))} */}
                    </Box>

                    <Box sx={{ flexGrow: 0 }}>
                        <Tooltip title="Open settings">
                            <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                                {/* {usuario && <Avatar>{user?.nickname?.[0]}</Avatar>} */}
                                {showInitial === true ? <Avatar src={`http://localhost:8080/${corteImagen()}`} /> : <Avatar>{user?.nickname?.[0]}</Avatar>}
                            </IconButton>
                        </Tooltip>
                        <Menu
                            sx={{ mt: '45px' }}
                            id="menu-appbar"
                            anchorEl={anchorElUser}
                            anchorOrigin={{
                                vertical: 'top',
                                horizontal: 'right',
                            }}
                            keepMounted
                            transformOrigin={{
                                vertical: 'top',
                                horizontal: 'right',
                            }}
                            open={Boolean(anchorElUser)}
                            onClose={handleCloseUserMenu}
                        >
                            {/* {settings.map((setting) => (
                                <MenuItem key={setting} onClick={handleCloseUserMenu}>
                                    <Typography textAlign="center">{setting}</Typography>
                                </MenuItem>
                            ))} */}
                            {settings.map((setting) => {
                                if (setting === 'Logout') {
                                    return (
                                        <MenuItem key={setting} onClick={desconectar}>
                                            <Typography textAlign="center">{setting}</Typography>
                                        </MenuItem>
                                    )
                                }
                                if (setting === 'Profile') {
                                    return (
                                        <MenuItem key={setting} onClick={() => navigate(`/profile/${usuario.id}`)}>
                                            <Typography textAlign="center">{setting}</Typography>
                                        </MenuItem>
                                    )
                                }
                                if (setting === 'Subir Imagen') {
                                    return (
                                        <MenuItem key={setting} onClick={handleOpenUpdatePopup}>
                                            <Typography textAlign="center">{setting}</Typography>
                                        </MenuItem>

                                    )
                                }
                                else {
                                    return (
                                        <MenuItem key={setting} onClick={handleCloseUserMenu}>
                                            <Typography textAlign="center">{setting}</Typography>
                                        </MenuItem>
                                    )
                                }
                            })}
                        </Menu>
                    </Box>
                </Toolbar>
            </Container>
            <Dialog open={openUpdatePopup} onClose={() => setOpenUpdatePopup(false)}>
                <Update onClose={() => setOpenUpdatePopup(false)} />
            </Dialog>
        </AppBar>
    )
}

export default Navbar
