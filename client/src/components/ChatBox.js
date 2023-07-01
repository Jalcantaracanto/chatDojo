import React, { useEffect, useState } from 'react'
import { getUser } from '../services/user.service'

export const ChatBox = ({ chat, currentUser }) => {
    const [userData, setUserData] = useState(null)

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

    useEffect(() => {
        if (chat !== null) getUserData()
    }, [chat, currentUser])

    return (
        <>
            <div className="Chatbox-container">
                <>
                    <div className="chat-header">
                        <div className="follower">
                            <div>
                                <div className="online-dot">
                                    <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQQX5BeToF0W5MHlThCJ7UAW5owfTqbJEYCfGG9h-nerA&s" className="followerImage" style={{ width: '50px', height: '50px' }} />
                                    <div className="name" style={{ fontSize: '0.8rem' }}>
                                        <span>{userData?.nickname} </span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </>
            </div>
        </>
    )
}
