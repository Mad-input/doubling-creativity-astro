import TagUser from "./TagUser"
import userStore from '../store/userStore.js'

export default function UserStatus() {
  const { isAuthenticated, setShowModalLogin } = userStore()

  return (
    !isAuthenticated
      ?
      <div className="buttons-s-i">
        <button className="btn s">
          <a href="/register" rel="noopener noreferrer">Unirse</a>
        </button>
        <button className="btn i" onClick={setShowModalLogin}>Iniciar Sesión</button>
      </div>
      :
      <TagUser></TagUser>
  )
}
