import React, { useContext, useEffect, useState } from 'react'
import './Chat.css'
// import { useSelector } from 'react-redux'
import { userChats } from '../services/chat.service'
import { UserContext } from '../context/UserProvider'
import { useNavigate } from 'react-router-dom'
import Cookies from 'js-cookie'
import { logout } from '../services/user.service'
import { Conversation } from '../components/Conversation'
import { ChatBox } from '../components/ChatBox'

export const Chat = () => {
    const [chats, setChats] = useState([])
    const [currentChat, setCurrentChat] = useState(null)

    const navigate = useNavigate()

    const { usuario } = useContext(UserContext)

    const getChats = () => {
        userChats(usuario.id)
            .then((response) => {
                setChats(response.data.chat)
                // console.log(response.data.chat)
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
                // console.log(response)
                Cookies.remove('usertoken') //agregue esto y lo elimina, no se si sea la solucion pero funcion de momento
                navigate('/')
            })
            .catch((error) => {
                console.log(error)
            })
    }

    return (
        <div className="Chat">
            {/* Left Side */}
            <div className="Left-side-chat">
                {/* <LogoSearch/>  -> Contiene un buscador*/}
                <div className="Chat-container">
                    <h2>Chats</h2>
                    <div className="Chat-list">
                        {chats.map((chat, index) => (
                            <div key={index} onClick={() => setCurrentChat(chat)}>
                                <Conversation data={chat} currentUserId={usuario.id} />
                            </div>
                        ))}
                    </div>
                </div>
            </div>
            {/* Right Side */}
            <div className="Right-side-chat">
                <div style={{ width: '20rem', alignSelf: 'flex-end' }}></div>
                <ChatBox chat={currentChat} currentUser={usuario.id} />
            </div>
            <button onClick={desconectar}>Desconectar</button>
        </div>
    )
}
