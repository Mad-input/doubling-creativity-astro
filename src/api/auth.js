import axios from 'axios'
import { API } from '../../config'

const registerUser = async (values) => await axios.post(`${API}/register`,values)

const loginUser = async (values) => await axios.post(`${API}/login`, values, {withCredentials: true})

const getProfile = async () => await axios.get(`${API}/profile`,{withCredentials: true})

const logoutUser = async () => await axios.post(`${API}/logout`,{},{withCredentials: true})

const createDetail = async (values) => await axios.post(`${API}/details`,values, {withCredentials: true})

const getAllDetails = async () => await axios.get(`${API}/details`, {withCredentials: true})

export {
  registerUser,
  loginUser,
  getProfile,
  logoutUser,
  createDetail,
  getAllDetails
}
