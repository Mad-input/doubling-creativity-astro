import { useEffect, useState } from "react"
import { getProfile } from "../api/auth.js"
import '../assets/css/profileUser.css'
import userStorage from '../store/userStore.js'

export default function ProfileUser() {
  const [data, setData] = useState({})
  const create = (value) => new Date(value).toLocaleDateString()

  const getData = async () => {
    try {
      const response = await getProfile()
      return setData(response.data.user)
    } catch (error) {
      console.error(error)
    }
  }
  useEffect(() => {
    getData()
  }, [])
  return (
    <section className="profile-user">
      <div className="info-user">
        <img src={data.imageUser} alt="userImage" className="image-user" />
        <strong className="username">{data.name}</strong>
        <small className="user-email">{data.email}</small>
        <small className="user-date">Se unio: {create(data.createAt)}</small>
      </div>
      <h1>Quizzes Completados</h1>
    </section>
  )
}
