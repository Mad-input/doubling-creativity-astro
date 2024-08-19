import { useState } from 'react'
import '../assets/css/globalStyles.css'
import { logoutUser } from '../api/auth'

export default function TagUser({ children }) {
  const [showOptions, setShowOptions] = useState(false)

  const handleShow = () => setShowOptions(!showOptions)
  const logout = async () => {
    await logoutUser()
    localStorage.removeItem('user')
    window.location.replace('/')
  }
  return (
    <button className="tag-user" onClick={handleShow}>
      <img src="/img/arrow-down.svg" alt="arrow" className={showOptions ? 'rotate' : ''} />
      {children}
      {
        showOptions &&
        <ul className='option-list-user'>
          <li className='profile-link'><a href="/profile">Profile</a></li>
          <li className='logout-link' onClick={logout}>Logout</li>
        </ul>
      }
    </button>
  )
}
