import axios from 'axios'
import { API } from '../../config'

export const registerUser = async (values) => await axios.post(`${API}/register`,values)

export const loginUser = async (values) => await axios.post(`${API}/login`, values, {withCredentials: true})

export const getProfile = async () => await axios.get(`${API}/profile`,{withCredentials: true})

export const logoutUser = async () => await axios.post(`${API}/logout`,{},{withCredentials: true})
