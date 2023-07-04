import React, { useContext, useEffect, useState, useRef } from 'react'
import './Chat.css'
import { userChats } from '../services/chat.service'
import { UserContext } from '../context/UserProvider'
import { useNavigate } from 'react-router-dom'
import Cookies from 'js-cookie'
import { logout } from '../services/user.service'
import { Conversation } from '../components/Conversation'
import { ChatBox } from '../components/ChatBox'
import { io } from 'socket.io-client'
import { SearchContact } from '../components/SearchContact'

// MUI
import { Paper } from '@mui/material'
import Chip from '@mui/material/Chip'
import Switch from '@mui/material/Switch'
import ChatIcon from '@mui/icons-material/Chat'
import PeopleIcon from '@mui/icons-material/People'
import Button from '@mui/material/Button'
import { Navbar } from '../components/Navbar'
import PersonAddIcon from '@mui/icons-material/PersonAdd'

export const Chat = () => {
    const [chats, setChats] = useState([])
    const [currentChat, setCurrentChat] = useState(null)
    const [onlineUsers, setOnlineUsers] = useState([])
    const [sendMessage, setSendMessage] = useState(null)
    const [receiveMessage, setReceiveMessage] = useState(null)
    const navigate = useNavigate()
    const { usuario, clearLocalStorage } = useContext(UserContext)

    const socket = useRef()

    const [checked, setChecked] = React.useState(false)

    //popup
    const [isPopupOpen, setIsPopupOpen] = useState(false)
    const closePopup = () => {
        setIsPopupOpen(false)
    }

    const handleChange = (event) => {
        setChecked(event.target.checked)
    }

    //Enviar mensaje al socket server
    useEffect(() => {
        if (sendMessage !== null) {
            socket.current.emit('sendMessage', sendMessage)
        }
    }, [sendMessage])

    useEffect(() => {
        socket.current = io('http://localhost:8080')
        socket.current.emit('newUser', usuario.id)
        socket.current.on('getUsers', (users) => {
            setOnlineUsers([...users])
            console.log(users)
        })

        return () => {
            socket.current.disconnect()
        }
    }, [usuario])
    //Recibir mensaje del socket server
    useEffect(() => {
        socket.current.on('receiveMessage', (data) => {
            setReceiveMessage(data)
        })
    }, [])
    const getChats = () => {
        userChats(usuario.id)
            .then((response) => {
                setChats(response.data.chat)
            })
            .catch((error) => {
                console.log(error)
            })
    }
    useEffect(() => {
        getChats()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [usuario])

    const checkOnlineStatus = (chat) => {
        const chatMembers = chat.members.find((member) => member !== usuario.id)
        const online = onlineUsers.find((user) => user.userId === chatMembers)
        return online ? true : false
    }

    return (
        <>
            <Navbar />

            <div className="Chat">
                <div className="Left-side-chat">
                    <Paper elevation={3} style={{ padding: '10px' }}>
                        {checked ? <Chip icon={<PeopleIcon />} label="Chats/Friends" color="primary" variant="outlined" /> : <Chip icon={<ChatIcon />} label="Chats/Friends" color="primary" variant="outlined" />}
                        <br />
                        <Switch checked={checked} onChange={handleChange} inputProps={{ 'aria-label': 'controlled' }} />

                        <br />
                        {/* <AddCircleIcon /> */}
                        <PersonAddIcon onClick={() => setIsPopupOpen(true)} className="add-contact-icon" />
                        {isPopupOpen && (
                            <div className="popup">
                                <SearchContact closePopup={closePopup} />
                            </div>
                        )}

                        {checked ? (
                            <Paper elevation={3} style={{ padding: '10px' }}>
                                <div className="Chat-container">
                                    {/* <div className="Chat-list">
                            {chats.map((chat, index) => (
                                <div key={index} onClick={() => setCurrentChat(chat)}>
                                    <Conversation data={chat} currentUserId={usuario.id} online={checkOnlineStatus(chat)} />
                                </div>
                            ))}
                        </div> */}
                                </div>
                            </Paper>
                        ) : (
                            <Paper elevation={3} style={{ padding: '10px' }}>
                                <div className="Chat-container">
                                    <div className="Chat-list">
                                        {chats.map((chat, index) => (
                                            <div key={index} onClick={() => setCurrentChat(chat)}>
                                                <Conversation data={chat} currentUserId={usuario.id} online={checkOnlineStatus(chat)} />
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </Paper>
                        )}
                    </Paper>
                </div>
                {/* right side  */}
                <Paper elevation={3} style={{ padding: '10px' }}>
                    <div className="Right-side-chat">
                        <ChatBox chat={currentChat} currentUser={usuario.id} setSendMessage={setSendMessage} receiveMessage={receiveMessage} />
                    </div>
                </Paper>
            </div>
        </>
    )
}
