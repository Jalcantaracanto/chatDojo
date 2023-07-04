import React, { useContext, useEffect, useState } from 'react'
import { UserContext } from '../context/UserProvider'
import { getUser } from '../services/user.service'
import { Paper } from '@mui/material'
import { get } from 'mongoose'
import AccountCircle from '@mui/icons-material/AccountCircle';
import InputAdornment from '@mui/material/InputAdornment';

export const Pruebab = () => {
    const [user, setUser] = useState({})
    const [contactNames, setContactNames] = useState([]) // Array de nombres de contactos
    const { usuario } = useContext(UserContext)
    const userId = usuario.id

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

    const getContactNames = async () => {
        const contactos = user.contactos

        const nombresPromises = contactos.map((contacto) =>
            getUser(contacto)
                .then((res) => res.data.user.nickname)
                .catch((err) => {
                    console.log(err)
                    return '' // Manejo del error en caso de que no se pueda obtener el nombre
                })
        )

        const nombres = await Promise.all(nombresPromises)
        setContactNames(nombres)
    }

    useEffect(() => {
        getUserFromService()
    }, [userId])

   


    return (
        <>

            <button onClick={getContactNames}>test</button>

            <Paper elevation={3} style={{ padding: '10px' }}>
                {contactNames.map((nombre, index) => (
                    <div key={index}>
                        <div style={{ display: 'flex', alignItems: 'center' }}>                          
                                {nombre && <AccountCircle />}
                            <span>{nombre}</span>
                        </div>
                    </div>
                ))}
            </Paper>

            {/*  <div>
                    {contactNames.map((nombre, index) => (
                        <div key={index}>{nombre}</div>
                    ))}
                </div> */}


        </>
    )
}
