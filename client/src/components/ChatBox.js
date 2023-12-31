import React, { useEffect, useState, useRef } from 'react'
import { getUser } from '../services/user.service'
import { getMessages } from '../services/message.service'
import { format } from 'timeago.js'
import InputEmoji from 'react-input-emoji'
import { addMessage } from '../services/message.service'
import './chatBox.css'
import { Paper } from '@mui/material'
import Avatar from '@mui/material/Avatar'

export const ChatBox = ({ chat, currentUser, setSendMessage, receiveMessage }) => {
    const [userData, setUserData] = useState(null)
    const [messages, setMessages] = useState([])
    const [newMessage, setnewMessage] = useState('')
    const scroll = useRef()
    const [showInitial, setShowInitial] = useState(false)

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
                response.data.user?.imagen?.path ? setShowInitial(true) : setShowInitial(false)
            })
            .catch((error) => {
                console.log(error)
            })
    }

    //windows
    /* const corteImagen = () => {
        const ruta = user?.imagen?.path
        const cortar = ruta?.split('\\').slice(-1)[0]

        return cortar
    } */

    //mac
    const corteImagen = () => {
        const ruta = userData?.imagen?.path;
        const cortar = ruta?.split('/').slice(-1)[0];
      
        return cortar;
      };

    const getMessagesData = () => {
        getMessages(chat._id)
            .then((response) => {
                // console.log(response.data.message)
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
        // console.log(chat)
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
                            <div className="follower">
                                <div className="online-dot">
                                    <div className="follower-info">
                                        {/* <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQQX5BeToF0W5MHlThCJ7UAW5owfTqbJEYCfGG9h-nerA&s" className="followerImage" style={{ width: '50px', height: '50px' }} /> */}
                                        {/* <Avatar>{userData?.nickname[0]}</Avatar>  */}
                                        {showInitial === true ? <Avatar src={`http://localhost:8080/${corteImagen()}`} /> : <Avatar>{userData?.nickname?.[0]}</Avatar>}
                                        <div className="name" style={{ fontSize: '0.8rem' }}>
                                            <span>{userData?.nickname} </span>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <hr style={{ width: '85%', border: '0.1px solid #ececec' }} />
                        </div>
                        {/* Chatbox Messages */}
                        <div className="chatbox">
                            {messages.map((message, index) => (
                                <div key={index} className="chatbox-message" >
                                    <div ref={scroll}></div>
                                    <div className={message.senderId === currentUser ? 'message own' : 'message'}>
                                        <span>{message.text}</span>
                                    </div>
                                    {/* <div>
                                        <span>{format(message.createdAt)}</span>
                                    </div> */}
                                </div>
                            ))}
                        </div>
                        {/* chat sender*/}
                        <div className="chat-sender">
                            {/* <div>+</div> */}
                            <InputEmoji value={newMessage} onChange={handleChange} />
                            <button className="send-button button" onClick={handleSend}>
                                Enviar
                            </button>
                        </div>
                    </>
                ) : (
                    <span className="chatbox-empty-message">Welcome! Tap on Chat to start Conversation</span>
                )}
            </div>
        </>
    )
}
