import React, { useContext, useEffect, useState } from 'react'
import { UserContext } from '../context/UserProvider'
import { getUser } from '../services/user.service'

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
            <h1>Prueba B</h1>
            <button onClick={getContactNames}>test</button>
            <ul>
                {contactNames.map((nombre, index) => (
                    <li key={index}>{nombre}</li>
                ))}
            </ul>
        </>
    )
}
