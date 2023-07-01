import axios from 'axios'

export const userChats = (id) => axios.get(`http://localhost:8080/chats/${id}`)
