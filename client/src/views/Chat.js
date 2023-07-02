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
import { Paper } from '@mui/material'



// MUI 



export const Chat = () => {
    const [chats, setChats] = useState([])
    const [currentChat, setCurrentChat] = useState(null)
    const [onlineUsers, setOnlineUsers] = useState([])
    const [sendMessage, setSendMessage] = useState(null)
    const [receiveMessage, setReceiveMessage] = useState(null)
    const navigate = useNavigate()
    const { usuario, clearLocalStorage } = useContext(UserContext)

    const socket = useRef()

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

    const desconectar = () => {
        logout()
            .then((response) => {
                Cookies.remove('usertoken')
                clearLocalStorage()
                navigate('/')
            })
            .catch((error) => {
                console.log(error)
            })
    }

    const checkOnlineStatus = (chat) => {
        const chatMembers = chat.members.find((member) => member !== usuario.id)
        const online = onlineUsers.find((user) => user.userId === chatMembers)
        return online ? true : false
    }

    return (
        <div className="Chat">
            <div className="Left-side-chat">
                <Paper elevation={3} style={{ padding: '10px' }}>
                <div className="Chat-container">
                    <h2>Chats</h2>
                    
                    <div className="Chat-list">
                        {chats.map((chat, index) => (
                            <div key={index} onClick={() => setCurrentChat(chat)}>
                                <Conversation data={chat} currentUserId={usuario.id} online={checkOnlineStatus(chat)} />
                            </div>
                        ))}
                    </div>
                </div>
                <button onClick={desconectar}>Desconectar</button>
                </Paper>
            </div>
            {/* right side  */}
            <Paper elevation={3} style={{ padding: '10px' }}>
            <div className="Right-side-chat">
             
                <div style={{ width: '20rem', alignSelf: 'flex-end' }}>
                    <div className="Online-users">
                        <h2>Usuarios en línea</h2>
                        <ul>
                            {onlineUsers.map((user) => (
                                <li key={user.userId}>{user.userId}</li>
                            ))}
                        </ul>
                    </div>
                </div>
                <ChatBox chat={currentChat} currentUser={usuario.id} setSendMessage={setSendMessage} receiveMessage={receiveMessage} />
            </div>
            </Paper>
            
           
        </div>
       
    )
}
