import React from 'react'
import './App.css'
import { Route, Routes } from 'react-router-dom'
import { Chat } from './views/Chat'
import { Forms } from './views/Forms'
import { UserProvider } from './context/UserProvider'

function App() {
    return (
        <UserProvider>
            <Routes>
                {/* <Route path="/chat" element={user ? <Chat /> : <Navigate to={<Login />} />} /> */}
                <Route path="/" element={<Forms />} />
                <Route path="/login" element={<Forms />} />
                <Route path="/chat" element={<Chat />} />
            </Routes>
        </UserProvider>
    )
}

export default App
