import axios from 'axios'

export const userChats = (id) => axios.get(`http://localhost:8080/chats/${id}`)
export const createChat = (chat) => axios.post('http://localhost:8080/chats', chat)
