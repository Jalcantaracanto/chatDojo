import React, { useEffect, useState } from 'react'
import { getUser } from '../services/user.service'
import '../views/Chat.css'
import { Paper } from '@mui/material'
import AccountCircle from '@mui/icons-material/AccountCircle';
import InputAdornment from '@mui/material/InputAdornment';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import { deleteChat } from '../services/chat.service'
import Avatar from '@mui/material/Avatar'

export const Conversation = ({ data, currentUserId, online, getChats }) => {
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

    const removeChat = () => {
        deleteChat(data._id)
            .then((response) => {
                console.log(response)
                getChats()
            }
            )
            .catch((error) => {
                console.log(error)
            }
            )
    }
    return (
        <>
            <Paper elevation={3} style={{ padding: '10px' }}>
                <div className="follower conversation">
                    <div>
                        <div /* className="online-dot" */ style={{ display: 'flex', justifyContent: 'space-beetween', alignContent: 'center', gap: '20px' }} >
                            {/* {online && <div className="online-dot">Online</div>} */}
                            <Avatar>{userData?.nickname[0]}</Avatar>   
                            {/* <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQQX5BeToF0W5MHlThCJ7UAW5owfTqbJEYCfGG9h-nerA&s" className="followerImage" style={{ width: '50px', height: '50px' }} /> */}
                            <div className="name" style={{ fontSize: '1rem' }}>
                                <span>{userData?.nickname} </span>
                                <span style={{ color: online ? "#51e200" : "grey" }}>{online ? "Online" : "Offline"}</span>
                            </div>
                            {/* <span onClick={removeChat}  ><DeleteForeverIcon/></span> */}
                        </div>
                    </div>
                </div>
            </Paper>
            <hr style={{ width: '85%', border: '0.1px solid #ececec' }} />
        </>
    )
}
