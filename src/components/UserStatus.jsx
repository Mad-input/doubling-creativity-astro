import { useEffect, useState } from "react"
import TagUser from "./TagUser"

export default function UserStatus() {
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [user, setUser] = useState(null)

  useEffect(() => {
    const data = localStorage.getItem('user')
    if (data) {
      setUser(JSON.parse(data)); // Si hay data, guardarla como objeto
      setIsAuthenticated(true);  // Establecer autenticado en true
    } else {
      setIsAuthenticated(false); // Si no hay data, es false
    }
  }, [])

  const handleDialog = () => {
    const modal = document.querySelector('.dialog-modal')
    modal.style.display = 'flex'
  }
  return (
    !isAuthenticated ?
      <div className="buttons-s-i">
        <button className="btn s">
          <a href="/register" rel="noopener noreferrer">Sing up</a>
        </button>
        <button className="btn i" onClick={handleDialog}>Log In</button>
      </div>
      : (<TagUser>{user.user.name}</TagUser>)
  )
}
