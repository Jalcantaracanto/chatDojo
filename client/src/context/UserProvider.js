import React, { useState, createContext } from 'react'

export const UserContext = createContext([])

export const UserProvider = ({ children }) => {
    const [usuario, setUsuario] = useState({
        id: '',
        nickname: '',
        email: '',
    })

    return (
        <UserContext.Provider
            value={{
                usuario,
                setUsuario,
            }}
        >
            {children}
        </UserContext.Provider>
    )
}
