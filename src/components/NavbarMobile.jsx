import { useEffect, useState } from "react"
import '../assets/css/stylesNavbar.css'

export default function NavbarMobile() {
  const [isMobile, setIsmobile] = useState(false)

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
  const handleDialog = ()=> {
    const modal = document.querySelector('.dialog-modal')
    modal.style.display = 'flex'
  }

  return (

    isMobile ?
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
          <li className="list-item"><a href="/">Home</a></li>
          <li className="list-item"><a href="#">Courses</a></li>
          <li className="list-item"><a href="#">About Us</a></li>
          <li className="list-item"><a href="#">Articles</a></li>
        </ul>
        <div className="buttons-s-i">

          <a href="/register" rel="noopener noreferrer" className="btn s">Sing up</a>

          <button className="btn i" id="btnShowModal" onClick={handleDialog}>Log In</button>
        </div>
      </nav>
      : ''
  )
}