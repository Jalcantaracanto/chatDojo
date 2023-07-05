import React, { useContext, useEffect, useState, useRef } from 'react'
import './Chat.css'
import { userChats } from '../services/chat.service'
import { UserContext } from '../context/UserProvider'
import { Conversation } from '../components/Conversation'
import { ChatBox } from '../components/ChatBox'
import { io } from 'socket.io-client'
import { SearchContact } from '../components/SearchContact'
import { Friends } from '../components/Friends'

// MUI
import { Paper } from '@mui/material'
import Chip from '@mui/material/Chip'
import Switch from '@mui/material/Switch'
import ChatIcon from '@mui/icons-material/Chat'
import PeopleIcon from '@mui/icons-material/People'
import { Navbar } from '../components/Navbar'
import PersonAddIcon from '@mui/icons-material/PersonAdd'
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';

export const Chat = () => {
    const [chats, setChats] = useState([])
    const [currentChat, setCurrentChat] = useState(null)
    const [onlineUsers, setOnlineUsers] = useState([])
    const [sendMessage, setSendMessage] = useState(null)
    const [receiveMessage, setReceiveMessage] = useState(null)
    const { usuario } = useContext(UserContext)

    const socketRef = useRef(null)

    const [checked, setChecked] = useState(false)

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
            socketRef.current.emit('sendMessage', sendMessage)
        }
    }, [sendMessage])

    useEffect(() => {
        socketRef.current = io(':8080')
        socketRef.current.emit('newUser', usuario.id)
        socketRef.current.on('getUsers', (users) => {
            setOnlineUsers([...users])
            console.log(users)
        })

        return () => {
            socketRef.current.disconnect()
        }
    }, [usuario])

    //Recibir mensaje del socket server
    useEffect(() => {
        socketRef.current.on('receiveMessage', (data) => {
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
                                <SearchContact closePopup={closePopup} getChats={getChats}/>
                            </div>
                        )}

                        {checked ? (
                            <Paper elevation={3} style={{ padding: '10px' }}>
                                <div className="Chat-container">
                                    <div className="Chat-list">
                                        <Friends />
                                        {/* {chats.map((chat, index) => (
                    <div key={index} onClick={() => setCurrentChat(chat)}>
                        <Conversation data={chat} currentUserId={usuario.id} online={checkOnlineStatus(chat)} />
                    </div>
                    ))} */}
                                    </div>
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
