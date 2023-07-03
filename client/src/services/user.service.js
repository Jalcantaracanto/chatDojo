import axios from 'axios'

export const registro = (user) => axios.post('http://localhost:8080/user/register', user, { withCredentials: true })
export const login = (user) => axios.post('http://localhost:8080/user/login', user, { withCredentials: true })
export const logout = () => axios.post('http://localhost:8080/user/logout', {}, { withCredentials: true })
export const getUser = (id) => axios.get(`http://localhost:8080/user/${id}`, { withCredentials: true })
export const getUsers = () => axios.get('http://localhost:8080/users', { withCredentials: true })
export const updateUser = (id, user) => axios.put(`http://localhost:8080/user/${id}`, user, { withCredentials: true })
export const addContact = (id, user) => axios.put(`http://localhost:8080/user/${id}`, user, { withCredentials: true })