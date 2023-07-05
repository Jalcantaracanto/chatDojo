import React, { useEffect, useState } from 'react'
import { useContext } from 'react'
import { UserContext } from '../context/UserProvider'
import { getUser, updateUser } from '../services/user.service'

export const Update = () => {
    const [user, setUser] = useState({})

    const { usuario } = useContext(UserContext)
    console.log(usuario)

    const getUserFromService = () => {
        
        getUser(usuario.id)
            .then((res) => {
                console.log(res.data.user)
                setUser(res.data.user)
            })
            .catch((err) => {
                console.log(err)
            })
    }

    const uploadUser = (e) => {
        e.preventDefault()

        const data = new FormData()
        data.append('imagen', user.imagen)

        updateUser(usuario.id, data)
            .then((res) => {
                console.log(res)
            })
            .catch((err) => {
                console.log(err)
            })
    }

    const uploadImage = (e) => {
        setUser({ ...user, imagen: e.target.files[0] })
    }

    useEffect(() => {
        getUserFromService()
    }, [])

    return (
        <>
            <h1>Actualizar</h1>
            <input type="file" name="imagen" onChange={uploadImage} />
            <button onClick={uploadUser}>Subir Imagen</button>
        </>
    )
}
