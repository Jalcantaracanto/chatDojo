Zuukens
zuukens
Invisible

Zuukens — 29/06/2023 18:55
Imagen
https://codepen.io/imprakash/pen/GgNMXO
CodePen
Prakash
Pure css popup box
check out the full explanation at http://www.sevensignature.com/blog/code/pure-css-popup-without-javascript...
Pure css popup box
Zuukens — 29/06/2023 19:31
<Button
  variant="contained"
  component="label"
>
  Upload File
  <input
    type="file"
    hidden
  />
</Button>
Zuukens — 29/06/2023 19:41
entramos solo al reto
la profe me rompio
Imagen
sergioflorean — 29/06/2023 19:46
nos rompio jajaja
Zuukens — 29/06/2023 19:46
su proyecto vale verga
:v eso dijo
Imagen
Imagen
sergioflorean — 29/06/2023 19:54
y menciono a gaby jajaja nos mato
Zuukens — 29/06/2023 19:54
que cosa hizo gaby?
sergioflorean
 ha iniciado una llamada que ha durado 3 minutos.
 — 29/06/2023 20:04
sergioflorean
 ha iniciado una llamada que ha durado una hora.
 — 30/06/2023 10:50
Zuukens — 30/06/2023 10:55
https://app.videosdk.live/quick-start/interactive-live-streaming/build-from-scratch/web/react
Video SDK Dashboard | Get started with 10,000 minutes free every mo...
Video SDK dashboard provides real-time updates of all the meetings, records of sessions, live streams and videos, and more! Providing the best developer experience in video APIs.
Video SDK Dashboard | Get started with 10,000 minutes free every mo...
https://dev.to/video-sdk/build-video-calling-app-using-react-hooks-1a79
DEV Community
Build a Video Chat App with React Hooks
It is easy to use functional components with react hooks API. In this tutorial, we are going to use...
Build a Video Chat App with React Hooks
https://prod.liveshare.vsengsaas.visualstudio.com/join?02CF40F52C2D074C7D92BB0E87840FA06DE7
Visual Studio Code for the Web
Build with Visual Studio Code, anywhere, anytime, entirely in your browser.
Zuukens
 ha iniciado una llamada que ha durado unos segundos.
 — 30/06/2023 16:55
Zuukens
 ha iniciado una llamada que ha durado 4 horas.
 — 30/06/2023 16:55
Zuukens — 30/06/2023 16:58
1 - https://www.youtube.com/watch?v=t_vCXrVL5H4&t=1466s
2 - https://www.youtube.com/watch?v=VQCeu2mq8wE
3- https://www.youtube.com/watch?v=SDMs2Pq6w90
Zuukens — 30/06/2023 17:22
https://prod.liveshare.vsengsaas.visualstudio.com/join?B80C58513F33C505C62A8C213614C8899E89
Visual Studio Code for the Web
Build with Visual Studio Code, anywhere, anytime, entirely in your browser.
Zuukens — 30/06/2023 17:43
Imagen
Zuukens — 30/06/2023 17:50
Imagen
sergioflorean — 30/06/2023 18:45
import React from 'react';
import Styles from '../styles/Forms.module.sass';
import  { Register } from './Register';
import  { Login } from './Login';

//material ui import 
Expandir
Forms.js
2 KB
import React, { useState } from 'react';
import { registro } from '../services/user.service'
import { useNavigate } from 'react-router-dom';

//MUI
import Alert from '@mui/material/Alert';
Expandir
Register.js
10 KB
import React, { useState, useContext } from 'react'
import { login } from '../services/user.service'
import { useNavigate, Link } from 'react-router-dom'
import Cookies from 'js-cookie'
import { UserContext } from '../context/userProvider'
Expandir
Login.js
8 KB
Tipo de archivo adjunto: unknown
Forms.module.sass
95 bytes
npm install @mui/material @emotion/react @emotion/styled
npm i @mui/icons-material
sergioflorean — 30/06/2023 18:52
import React, { useState, createContext } from 'react'

export const UserContext = createContext([])

export const UserProvider = ({ children }) => {
Expandir
userProvider.js
1 KB
import axios from 'axios';

export const registro = (usuario) => axios.post('http://localhost:8080/api/registro', usuario, {withCredentials: true})
export const login = (usuario) => axios.post('http://localhost:8080/api/login', usuario, {withCredentials: true})
export const logout = () => axios.post('http://localhost:8080/api/logout', {}, {withCredentials: true})
export const actualizarUsuario = (id, usuario) => axios.put(`http://localhost:8080/api/usuario/${id}`, usuario, {withCredentials: true})
Expandir
user.service.js
1 KB
sergioflorean — 30/06/2023 19:07
<button onClick={desconectar}>Desconectar</button>
const desconectar = () => {
        logout()
            .then((response) => {
                console.log(response)
                Cookies.remove('usertoken') //agregue esto y lo elimina, no se si sea la solucion pero funcion de momento
                navigate('/')
            })
            .catch((error) => {
                console.log(error)
            })
    }
sergioflorean — 30/06/2023 19:40
no dejaste
el
navegador abierto jajaja
no sera el provedor de contexto
que en los modelos y controladores esta como user
y ahi estas mandando ususairo?
ah no
no es eso porqeu si se conecta y mana el id
olvidalo
Zuukens — 30/06/2023 20:55
https://github.com/Jalcantaracanto/chatDojo/invitations
sergioflorean — 01/07/2023 9:26
Buenas buenas
Me avisas
Zuukens — 01/07/2023 9:30
Estoy preparándome algo de desayuno y entro
sergioflorean — 01/07/2023 9:33
Ando haciendo también cafécito
Provecho
Zuukens
 ha iniciado una llamada que ha durado 3 horas.
 — 01/07/2023 9:52
sergioflorean — 01/07/2023 9:58
Imagen
Zuukens — 01/07/2023 12:40
https://github.com/ZainRk/MERN-SocialMedia-ZAINKEEPSCODE
GitHub
GitHub - ZainRk/MERN-SocialMedia-ZAINKEEPSCODE
Contribute to ZainRk/MERN-SocialMedia-ZAINKEEPSCODE development by creating an account on GitHub.
GitHub - ZainRk/MERN-SocialMedia-ZAINKEEPSCODE
sergioflorean — hoy a las 15:56
andas?
Zuukens — hoy a las 15:56
si
estoy metiendo codigo ya
sergioflorean
 ha iniciado una llamada.
 — hoy a las 15:56
sergioflorean — hoy a las 17:25
/* :root {
  --yellow: #f5c32c;
  --orange: #fca61f;
  --black: #242d49;
  --gray: rgba(36, 45, 73, 0.65);
  --profileShadow: 0px 4px 17px 2px rgba(0, 0, 0, 0.25);
Expandir
chatBox.css
6 KB
import React, { useEffect, useState, useRef } from 'react'
import { getUser } from '../services/user.service'
import { getMessages } from '../services/message.service'
import { format } from 'timeago.js'
import InputEmoji from 'react-input-emoji'
import { addMessage } from '../services/message.service'
import "./chatBox.css";
import { Paper } from '@mui/material'

export const ChatBox = ({ chat, currentUser, setSendMessage, receiveMessage }) => {
    const [userData, setUserData] = useState(null)
    const [messages, setMessages] = useState([])
    const [newMessage, setnewMessage] = useState('')
    const scroll = useRef()

    useEffect(() => {
        if (receiveMessage !== null && receiveMessage.chatId === chat._id) {
            setMessages([...messages, receiveMessage])
        }
    }, [receiveMessage])

    const getUserData = () => {
        const userId = chat?.members?.find((id) => id !== currentUser)
        getUser(userId)
            .then((response) => {
                setUserData(response.data.user)
                console.log(response.data.user)
            })
            .catch((error) => {
                console.log(error)
            })
    }

    const getMessagesData = () => {
        getMessages(chat._id)
            .then((response) => {
                console.log(response.data.message)
                setMessages(response.data.message)
            })
            .catch((error) => {
                console.log(error)
            })
    }

    useEffect(() => {
        if (chat !== null) getUserData()
    }, [chat, currentUser])

    useEffect(() => {
        if (chat !== null) getMessagesData()
        console.log(chat)
    }, [chat])

    const handleChange = (text) => {
        setnewMessage(text)
    }

    const handleSend = (e) => {
        e.preventDefault()
        const message = {
            senderId: currentUser,
            text: newMessage,
            chatId: chat._id,
        }
        //send message to database
        addMessage(message)
            .then((response) => {
                setMessages([...messages, response.data.message])
                setnewMessage('')
            })
            .catch((error) => {
                console.log(error)
            })

        //send message to socket server
        const receiverId = chat.members.find((id) => id !== currentUser)
        setSendMessage({ ...message, receiverId })
    }

    // Scroll siempre baja al ultimo mensaje
    useEffect(() => {
        scroll.current?.scrollIntoView({ behavior: 'smooth' })
    }, [messages])

    return (
        <>
            <div className="Chatbox-container">
                {chat ? (
                    <>
                        <div className="chat-header">
                            <Paper elevation={3} style={{ width: '100%', height: '100%', borderRadius: '0px' }}>
                                <div className="follower">
                                    <div className="online-dot">
                                        <div className="follower-info">
                                            <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQQX5BeToF0W5MHlThCJ7UAW5owfTqbJEYCfGG9h-nerA&s" className="followerImage" style={{ width: '50px', height: '50px' }} />
                                            <div className="name" style={{ fontSize: '0.8rem' }}>
                                                <span>{userData?.nickname} </span>
                                            </div>
                                        </div>
                                    </div>
... (33 líneas restantes)
Contraer
ChatBox.js
6 KB
.Chat {
    position: relative;
    display: grid;
    grid-template-columns: 22% auto;
    gap: 1rem;
}
Expandir
Chat.css
2 KB
import React, { useContext, useEffect, useState, useRef } from 'react'
import './Chat.css'
import { userChats } from '../services/chat.service'
import { UserContext } from '../context/UserProvider'
import { useNavigate } from 'react-router-dom'
import Cookies from 'js-cookie'
Expandir
Chat.js
7 KB
﻿
import React, { useEffect, useState, useRef } from 'react'
import { getUser } from '../services/user.service'
import { getMessages } from '../services/message.service'
import { format } from 'timeago.js'
import InputEmoji from 'react-input-emoji'
import { addMessage } from '../services/message.service'
import "./chatBox.css";
import { Paper } from '@mui/material'

export const ChatBox = ({ chat, currentUser, setSendMessage, receiveMessage }) => {
    const [userData, setUserData] = useState(null)
    const [messages, setMessages] = useState([])
    const [newMessage, setnewMessage] = useState('')
    const scroll = useRef()

    useEffect(() => {
        if (receiveMessage !== null && receiveMessage.chatId === chat._id) {
            setMessages([...messages, receiveMessage])
        }
    }, [receiveMessage])

    const getUserData = () => {
        const userId = chat?.members?.find((id) => id !== currentUser)
        getUser(userId)
            .then((response) => {
                setUserData(response.data.user)
                console.log(response.data.user)
            })
            .catch((error) => {
                console.log(error)
            })
    }

    const getMessagesData = () => {
        getMessages(chat._id)
            .then((response) => {
                console.log(response.data.message)
                setMessages(response.data.message)
            })
            .catch((error) => {
                console.log(error)
            })
    }

    useEffect(() => {
        if (chat !== null) getUserData()
    }, [chat, currentUser])

    useEffect(() => {
        if (chat !== null) getMessagesData()
        console.log(chat)
    }, [chat])

    const handleChange = (text) => {
        setnewMessage(text)
    }

    const handleSend = (e) => {
        e.preventDefault()
        const message = {
            senderId: currentUser,
            text: newMessage,
            chatId: chat._id,
        }
        //send message to database
        addMessage(message)
            .then((response) => {
                setMessages([...messages, response.data.message])
                setnewMessage('')
            })
            .catch((error) => {
                console.log(error)
            })

        //send message to socket server
        const receiverId = chat.members.find((id) => id !== currentUser)
        setSendMessage({ ...message, receiverId })
    }

    // Scroll siempre baja al ultimo mensaje
    useEffect(() => {
        scroll.current?.scrollIntoView({ behavior: 'smooth' })
    }, [messages])

    return (
        <>
            <div className="Chatbox-container">
                {chat ? (
                    <>
                        <div className="chat-header">
                            <Paper elevation={3} style={{ width: '100%', height: '100%', borderRadius: '0px' }}>
                                <div className="follower">
                                    <div className="online-dot">
                                        <div className="follower-info">
                                            <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQQX5BeToF0W5MHlThCJ7UAW5owfTqbJEYCfGG9h-nerA&s" className="followerImage" style={{ width: '50px', height: '50px' }} />
                                            <div className="name" style={{ fontSize: '0.8rem' }}>
                                                <span>{userData?.nickname} </span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </Paper>
                            <hr style={{ width: '85%', border: '0.1px solid #ececec' }} />
                        </div>
                        {/* Chatbox Messages */}
                        <div className="chatbox-message">
                        {messages.map((message) => (
                            <>
                                <div ref={scroll}></div>
                                <div className={message.senderId === currentUser ? 'message own' : 'message'}>
                                    <span>{message.text}</span>
                                    {/* <div>
                                        <span>{format(message.createdAt)}</span>
                                    </div> */}
                                </div>
                            </>
                        ))}
                        </div>
                        {/* chat sender*/}
                        <div className="chat-sender">
                            {/* <div>+</div> */}
                            <InputEmoji value={newMessage} onChange={handleChange} />
                            <button className="send-button button" onClick={handleSend}>Enviar</button>
                        </div>
                    </>
                ) : (
                    <span className="chatbox-empty-message">Tap on Chat to start Conversation</span>
                )}
            </div>
        </>
    )
}