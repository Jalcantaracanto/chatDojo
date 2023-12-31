import React, { useEffect, useState, useContext } from 'react'
import { getUsers, addContact, getUser } from '../services/user.service'
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
import CancelIcon from '@mui/icons-material/Cancel'
import Alert from '@mui/material/Alert'

const Demo = styled('div')(({ theme }) => ({
    backgroundColor: theme.palette.background.paper,
}))

export const SearchContact = ({ closePopup, getChats }) => {
    const [dense, setDense] = useState(false)
    const [users, setUsers] = useState([])
    const [searchFilter, setSearchFilter] = useState([])
    const [user, setUser] = useState()

    // Error and success messages
    const [contactErorr, setContactError] = useState(false)
    const [formError, setFormError] = useState()
    const [formSuccess, setFormSuccess] = useState()

    const { usuario } = useContext(UserContext)

    const getUserFromService = () => {
        getUser(usuario.id)
            .then((response) => {
                setUser(response.data.user)
                console.log(response.data.user)
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

    const addContactFromService = (index) => {
        const contact = searchFilter[index]
        const contactId = contact._id

        const updatedUser = { ...user }
        if (updatedUser.contactos.includes(contactId)) {
            console.log('Contacto ya existe')
            setContactError(true)
            setFormError('Ya es tu contacto')
            return
        }

        updatedUser.contactos.push(contactId)

        addContact(user._id, updatedUser)
            .then((response) => {
                console.log(response)
                closePopup()
                setFormSuccess('Contacto agregado')
                getChats()
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
                                    .map((value, index) => {

                                        const ruta = value.imagen?.path;

                                        //windows
                                        // const cortar = ruta.split('\\').slice(-1)[0]

                                        //mac
                                        const cortar = ruta ? ruta.split('/').slice(-1)[0] : '';

                                        return (
                                            <ListItem
                                                secondaryAction={
                                                    <IconButton edge="end" aria-label="delete" onClick={() => addContactFromService(index)}>
                                                        <AddIcon />
                                                    </IconButton>
                                                }
                                                key={index}
                                            >
                                                <Avatar alt={value?.nickname?.[0]} src={`http://localhost:8080/${cortar}`} sx={{ width: 56, height: 56 }} />
                                                <ListItemText primary={value.nickname} />
                                            </ListItem>
                                        )
                                    })
                            ) : (
                                <p>No existe el Usuario</p>
                            )}
                        </List>
                    </Demo>
                </Grid>
                <IconButton className="popup-close-button" edge="end" aria-label="close" onClick={closePopup}>
                    <CancelIcon />
                </IconButton>
                {contactErorr && <Alert severity="warning">{formError}</Alert>}
                {formSuccess && <Alert severity="success">{formSuccess}</Alert>}
            </Box>
        </>
    )
}
