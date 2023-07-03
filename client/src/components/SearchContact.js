import React, { useEffect, useState, useContext } from 'react'
import { getUsers, updateUser, getUser } from '../services/user.service'
import { UserContext } from '../context/UserProvider'

// Material UI
import { styled } from '@mui/material/styles'
import Box from '@mui/material/Box'
import List from '@mui/material/List'
import ListItem from '@mui/material/ListItem'
import ListItemAvatar from '@mui/material/ListItemAvatar'
import ListItemText from '@mui/material/ListItemText'
import Avatar from '@mui/material/Avatar'
import IconButton from '@mui/material/IconButton'
import Grid from '@mui/material/Grid'
import TextField from '@mui/material/TextField'
import Stack from '@mui/material/Stack'
import AddIcon from '@mui/icons-material/Add'

const Demo = styled('div')(({ theme }) => ({
    backgroundColor: theme.palette.background.paper,
}))

export const SearchContact = () => {
    const [dense, setDense] = React.useState(false)
    const [users, setUsers] = useState([])
    const [searchFilter, setSearchFilter] = useState([])
    const [user, setUser] = useState()

    const { usuario } = useContext(UserContext)

    const getUserFromService = () => {
        getUser(usuario.id)
            .then((response) => {
                setUser(response.data.user)
            })
            .catch((error) => {
                console.log(error)
            })
    }

    const getAllUsersFromService = () => {
        getUsers()
            .then((response) => {
                setUsers(response.data.users)
            })
            .catch((error) => {
                console.log(error)
            })
    }

    useEffect(() => {
        getAllUsersFromService()
        getUserFromService()
    }, [])

    const handleChange = (e) => {
        const { value } = e.target

        if (value.trim() === '') {
            setSearchFilter([]) // Restablecer el estado del filtro a un arreglo vacío
            return
        }

        //filter with nickname
        const filteredUsers = users.filter((user) => {
            return user.nickname.toLowerCase().includes(value.toLowerCase())
        })
        setSearchFilter(filteredUsers)
    }

    const addContact = () => {
        const updatedUser = { ...user } // Copia el objeto de usuario actual
        updatedUser.contactos.push(searchFilter[0].nickname) // Agrega el ID del nuevo contacto al arreglo de contactos


        updateUser(user._id, updatedUser)
            .then((response) => {
                console.log(response)
            })
            .catch((error) => {
                console.log(error)
            })
    }

    return (
        <>
            <Box sx={{ flexGrow: 1, maxWidth: 752 }}>
                <Grid item xs={12} md={6}>
                    <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                        <Stack direction="row" spacing={4}>
                            <TextField id="standard-basic" label="Buscar Contacto" variant="standard" onChange={handleChange} />
                        </Stack>
                    </Box>
                    <Demo>
                        <List dense={dense}>
                            {searchFilter.length > 0 ? (
                                searchFilter
                                    .sort((a, b) => a.nickname.localeCompare(b.nickname)) // Ordena los elementos por el nickname
                                    .map((value, index) => (
                                        <ListItem
                                            secondaryAction={
                                                <IconButton edge="end" aria-label="delete" onClick={addContact}>
                                                    <AddIcon />
                                                </IconButton>
                                            }
                                            key={index}
                                        >
                                            <ListItemAvatar>
                                                <Avatar alt="avatar" src="https://img.freepik.com/vector-premium/perfil-avatar-hombre-icono-redondo_24640-14044.jpg?w=2000" sx={{ width: 56, height: 56 }} />
                                            </ListItemAvatar>
                                            <ListItemText primary={value.nickname} />
                                        </ListItem>
                                    ))
                            ) : (
                                <p>No existe el Usuario</p>
                            )}
                        </List>
                    </Demo>
                </Grid>
            </Box>
        </>
    )
}
