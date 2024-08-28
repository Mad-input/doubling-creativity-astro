import { useState } from 'react'
import '../assets/css/globalStyles.css'

import userStore from '../store/userStore.js'

export default function TagUser() {
  const [showOptions, setShowOptions] = useState(false)
  const { user, logout } = userStore()

  const handleShow = () => setShowOptions(!showOptions)

  return (
    <>
      <button className="tag-user" onClick={handleShow}>
        <img src={user.userImage} alt="userImage" className='user-image' />
        {user?.name}
        {
          showOptions &&
          <ul className='option-list-user'>
            <li className='profile-link'><a href="/profile">Perfil</a></li>
            <li className='logout-link' onClick={logout}>Cerrar Sesión</li>
          </ul>
        }
      </button>
    </>
  )
}
