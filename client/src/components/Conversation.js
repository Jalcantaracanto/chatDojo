import React, { useEffect, useState } from 'react'
import { getUser } from '../services/user.service'
import '../views/Chat.css'
import { Paper } from '@mui/material'
import AccountCircle from '@mui/icons-material/AccountCircle';
import InputAdornment from '@mui/material/InputAdornment';

export const Conversation = ({ data, currentUserId, online }) => {
    const [userData, setUserData] = useState(null)

    const getUserData = () => {
        const userId = data.members.find((id) => id !== currentUserId)
        getUser(userId)
            .then((response) => {
                setUserData(response.data.user)
                //console.log(response.data.user)
            })
            .catch((error) => {
                console.log(error)
            })
    }

    useEffect(() => {
        getUserData()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    return (
        <>
            <Paper elevation={3} style={{ padding: '10px' }}>
                <div className="follower conversation">
                    <div>
                        <div className="online-dot">
                            {online && <div className="online-dot">Online</div>}
                            <InputAdornment position="start">
                                <AccountCircle />
                            </InputAdornment>
                            {/* <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQQX5BeToF0W5MHlThCJ7UAW5owfTqbJEYCfGG9h-nerA&s" className="followerImage" style={{ width: '50px', height: '50px' }} /> */}
                            <div className="name" style={{ fontSize: '0.8rem' }}>
                                <span>{userData?.nickname} </span>
                                <span style={{color: online?"#51e200":""}}>{online? "Online" : "Offline"}</span>
                            </div>
                        </div>
                    </div>
                </div>
            </Paper>
            <hr style={{ width: '85%', border: '0.1px solid #ececec' }} />
        </>
    )
}
