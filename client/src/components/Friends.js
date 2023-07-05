import React, { useContext, useEffect, useState } from 'react';
import { UserContext } from '../context/UserProvider';
import { getUser } from '../services/user.service';
import { Paper } from '@mui/material';
import AccountCircle from '@mui/icons-material/AccountCircle';
import PersonRemoveIcon from '@mui/icons-material/PersonRemove';
import { createChat, userChats } from '../services/chat.service';
import { io } from 'socket.io-client';


export const Friends = () => {
    const { usuario } = useContext(UserContext)
    const [user, setUser] = useState({
        _id: usuario.id,
        nickname: usuario.nickname,
        email: usuario.email,
        contactos: []
    })
    const [contactNames, setContactNames] = useState([]) // Array de nombres de contactos
    const userId = usuario.id

    const [socket] = useState(() => io(':8080'))

    useEffect(() => {
        socket.on('users_from_server', (data) => {
            console.log(data)
        })
    }, [socket])

    const getUserFromService = () => {
        getUser(userId)
            .then((res) => {
                console.log(res.data.user)
                setUser(res.data.user)
            })
            .catch((err) => {
                console.log(err)
            })
    }

    useEffect(() => {
        getUserFromService()
    }, [userId])

    const getContactNames = async () => {
        if (!user.contactos) {
            return
        }

        const contactos = user.contactos

        const nombresPromises = contactos.map((contacto) =>
            getUser(contacto)
                .then((res) => ({
                    nombre: res.data.user.nickname,
                    id: contacto, // Agregar el ID del contacto al resultado
                }))
                .catch((err) => {
                    console.log(err)
                    return { nombre: '' } // Manejo del error en caso de que no se pueda obtener el nombre
                })
        )

        const nombres = await Promise.all(nombresPromises)
        setContactNames(nombres)
    }

    useEffect(() => {
        getContactNames()
    }, [user])

    const handleChatClick = async (contactId) => {
        try {
            // Verificar si ya existe un chat con el usuario
            const res = await userChats(userId)
            const chats = res.data.chat
            const existingChat = chats.find((chat) => chat.members.includes(contactId))
            if (existingChat) {
                // Ya existe un chat con la persona
                console.log('Ya existe un chat con esta persona')
                return
            }
            // Crear un nuevo chat si no existe uno previo
            const chatRes = await createChat({ senderId: userId, receiverId: contactId })
            console.log(chatRes.data.chat)
        } catch (err) {
            console.error(err)
        }
    }

    return (
        <>
            {contactNames &&
                contactNames.length > 0 &&
                contactNames.map((contacto, index) => (
                    <Paper elevation={3} style={{ padding: '10px' }}>
                        <div key={index}>
                            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                                {contacto.nombre && <AccountCircle />}
                                <span onClick={() => handleChatClick(contacto.id)} style={{ cursor: 'pointer' }}>
                                    {contacto.nombre}
                                </span>
                                {contacto.nombre && <PersonRemoveIcon style={{ cursor: 'pointer' }} />}
                            </div>
                        </div>
                    </Paper>
                ))}
        </>
    )
}
