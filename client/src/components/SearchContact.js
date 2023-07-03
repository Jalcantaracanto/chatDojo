import React, { useEffect, useState } from 'react'
import { getUsers } from '../services/user.service'

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

    const getAllUsersFromService = () => {
        getUsers()
            .then((response) => {
                console.log(response.data.users)
                setUsers(response.data.users)
            })
            .catch((error) => {
                console.log(error)
            })
    }

    useEffect(() => {
        getAllUsersFromService()
    }, [])

    const handleChange = (e) => {
        const { value } = e.target
        console.log(value)

        if (value.trim() === '') {
            setSearchFilter([]) // Restablecer el estado del filtro a un arreglo vacío
            return
        }

        //filter with nickname
        const filteredUsers = users.filter((user) => {
            return user.nickname.toLowerCase().includes(value.toLowerCase())
        })
        setSearchFilter(filteredUsers)
        console.log(filteredUsers)
    }

    // function generate() {
    //     return searchFilter.map((value) => (
    //         <ListItem
    //             secondaryAction={
    //                 <IconButton edge="end" aria-label="delete">
    //                     <AddIcon />
    //                 </IconButton>
    //             }
    //         >
    //             <ListItemAvatar>
    //                 <Avatar alt="avatar" src="https://img.freepik.com/vector-premium/perfil-avatar-hombre-icono-redondo_24640-14044.jpg?w=2000" sx={{ width: 56, height: 56 }} />
    //             </ListItemAvatar>
    //             <ListItemText primary={value.nickname} />
    //         </ListItem>
    //     ))
    // }

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
                                    .map((value) => (
                                        <ListItem
                                            secondaryAction={
                                                <IconButton edge="end" aria-label="delete">
                                                    <AddIcon />
                                                </IconButton>
                                            }
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
