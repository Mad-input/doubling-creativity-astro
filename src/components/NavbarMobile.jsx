import { useEffect, useState } from "react"
import '../assets/css/stylesNavbar.css'
import userStore from '../store/userStore.js'

export default function NavbarMobile() {
  const [isMobile, setIsmobile] = useState(false)
  const { isAuthenticated, setShowModalLogin } = userStore()


  useEffect(() => {
    const handleResize = () => {
      setIsmobile(window.innerWidth < 1100)
    }

    window.addEventListener('resize', handleResize)
    handleResize()
    return () => {
      window.removeEventListener('resize', handleResize)
    }
  }, [])
  const handleNavbar = (e) => {
    e.target.parentElement.classList.remove("show")
  }
  // <li className="list-item"><a href="/about">Sobre Nosotros</a></li>

  return (

    isMobile &&
    <nav className={`navbar-mobile`}>
      <button className="btn-close" onClick={handleNavbar}>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width='24'
          height='24'
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        ><path stroke="none" d="M0 0h24v24H0z" fill="none"></path><path d="M18 6l-12 12"></path><path d="M6 6l12 12"></path>
        </svg>
      </button>
      <ul className="list-navbar">
        <li className="list-item"><a href="/">Inicio</a></li>
        <li className="list-item"><a href="/tutorials">Tutoriales</a></li>
        <li className="list-item plus"><a href="/plus">Doubing Plus</a></li>
      </ul>
      {
        !isAuthenticated &&
        <div className="buttons-s-i">
          <a href="/register" rel="noopener noreferrer" className="btn s">Unirse</a>
          <button className="btn i" id="btnShowModal" onClick={setShowModalLogin}>Iniciar Sesión</button>
        </div>
      }
    </nav>
  )
}
