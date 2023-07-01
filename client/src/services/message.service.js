import axios from 'axios'

export const getMessages = (id) => axios.get(`http://localhost:8080/messages/${id}`)
export const addMessage = (message) => axios.post('http://localhost:8080/message', message)