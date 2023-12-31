import React from 'react'
import './App.css'
import { Route, Routes } from 'react-router-dom'
import { Chat } from './views/Chat'
import { Forms } from './views/Forms'
import { UserProvider } from './context/UserProvider'
import { SearchContact } from './components/SearchContact'
import Profile from './views/Profile'
import { Update } from './components/Update'

function App() {
    return (
        <div
            className="App"
            style={{
                height: window.location.href === 'http://localhost:3000/chat' ? 'calc(100vh - 2rem)' : 'auto',
            }}
        >
            <div className="blur" style={{ top: '-18%', right: '0' }}></div>
            <div className="blur" style={{ top: '36%', left: '-8rem' }}></div>
            <UserProvider>
                <Routes>
                    {/* <Route path="/chat" element={user ? <Chat /> : <Navigate to={<Login />} />} /> */}
                    <Route path="/" element={<Forms />} />
                    <Route path="/login" element={<Forms />} />
                    <Route path="/chat" element={<Chat />} />
                    <Route path="/buscar-contacto" element={<SearchContact />} />
                    <Route path="/profile/:id" element={<Profile />} />
                    <Route path="/editProfile" element={<Update />} />
                    {/* <Route path="/test" element={<Friends />} /> */}
                </Routes>
            </UserProvider>
        </div>
    )
}

export default App
