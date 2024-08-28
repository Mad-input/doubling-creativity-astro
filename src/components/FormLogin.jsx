import { useForm } from "react-hook-form"
import '../assets/css/stylesFormLogin.css'
import TagError from './TagError'
import { useState } from "react"
import userStore from '../store/userStore.js'

export default function FormLogin() {
  const [loading, setLoading] = useState(false)
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm()

  const { login, error, showModalLogin, setShowModalLogin } = userStore()

  const onSubmit = handleSubmit(async (values) => {
    try {
      setLoading(true)
      await login(values)
      setShowModalLogin()
    } catch (e) {
      setLoading(false)
    } finally {
      setLoading(false)
    }
  })

  const optionsEmail = {
    required: {
      value: true,
      message: "Requiere una dirección de correo",
    },
    pattern: {
      value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/,
      message: 'Correo Invalido'
    }
  }

  const optionsPassword = {
    required: {
      value: true,
      message: "Requiere Contraseña"
    }
  }

  return (
    <dialog className={`dialog-modal ${showModalLogin ? 'show' : ''}`}>
      <form id="form" onSubmit={onSubmit}>
        <button className="btn-close-modal" type="button" onClick={setShowModalLogin}>
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
        <h2 className="title-form">Iniciar Sesión</h2>
        <div className="logo">
          <a href="/"><img src="/img/logo-icon.svg" alt="logo" /></a>
        </div>
        {/* Mostrar error y loader */}
        {loading && <span className="loader"></span>}
        {error && <TagError text={error}></TagError>}
        <div className="containt-input">
          <input
            className={`${errors.email ? 'error' : 'ok'}`}
            type="email"
            placeholder=""
            {...register("email", optionsEmail)}
            autoComplete='off' />
          <label>Correo</label>
          {errors.email && <TagError text={errors.email.message} />}
        </div>
        <div className="containt-input">
          <input
            className={`${errors.password ? 'error' : 'ok'}`}
            type="password"
            placeholder=""
            {...register("password", optionsPassword)}
            autoComplete='off' />
          <label>Contraseña</label>
          {errors.password && <TagError text={errors.password.message} />}
        </div>

        <button type="submit" className="btn-submit" disabled={loading ? true : false} >Iniciar Sesión</button>
      </form>
    </dialog>
  )
}
