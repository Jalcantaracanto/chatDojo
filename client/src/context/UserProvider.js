import React, { useState, createContext, useEffect } from 'react'

export const UserContext = createContext([])

export const UserProvider = ({ children }) => {
    const [usuario, setUsuario] = useState({ token: null })

    useEffect(() => {
        // Recupera el usuario del almacenamiento local al cargar la página
        const storedUser = localStorage.getItem('usuario')
        if (storedUser) {
            setUsuario(JSON.parse(storedUser))
        }
    }, [])

    useEffect(() => {
        // Guarda el usuario cada vez que hay un cambio
        localStorage.setItem('usuario', JSON.stringify(usuario))
    }, [usuario])

    const clearLocalStorage = () => {
        setUsuario({
            id: '',
            nickname: '',
            email: '',
        })
    }

    return (
        <UserContext.Provider
            value={{
                usuario,
                setUsuario,
                clearLocalStorage,
            }}
        >
            {children}
        </UserContext.Provider>
    )
}
