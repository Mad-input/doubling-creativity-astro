import { useForm } from 'react-hook-form'
import TagError from './TagError.jsx'
import '../assets/css/stylesFormLogin.css'
import { useEffect, useState } from 'react'
import userStore from '../store/userStore.js';
import SetImage from './SetImage.jsx';

export default function FormRegister() {
  const {
    handleSubmit,
    register,
    watch,
    reset,
    formState: {
      errors
    }
  } = useForm()

  const { signUp, error, setError } = userStore()

  const [loading, setLoading] = useState('')
  const [userImage, setUserImage] = useState('')

  const optionsUsername = {
    required: {
      value: true,
      message: "Requiere un Nombre"
    },
    minLength: {
      value: 3,
      message: "Minimo 3 Caracteres"
    },
    maxLength: {
      value: 20,
      message: "Maximo 20 Caracteres"
    }
  }

  const optionsEmail = {
    required: {
      value: true,
      message: "Requiere una Dirección de Correo Valida",
    },
    pattern: {
      value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/,
      message: 'Correo Invalido'
    }
  }

  const optionsPassword = {
    required: {
      value: true,
      message: "Requiere una Contraseña"
    },
    minLength: {
      value: 6,
      message: "Debe Contener Un Minimo de Seis"
    }
  }

  const optionsConfirmPassword = {
    required: {
      value: true,
      message: "Requiere una Contraseña"
    },
    validate: (value) => value === watch('password') ? true : 'Contraseñas no Coinsiden'
  }


  const onSubmit = handleSubmit(async (values) => {
    setLoading(true)
    try {
      await signUp({ ...values, userImage })
    } catch (error) {
      setError(error)
      setLoading(false)
    } finally {
      setLoading(false)
    }
    reset()
    window.location.replace('/')
  })

  useEffect(() => {
    setTimeout(() => {
      setError('')
    }, 5000);
  }, [error])

  return (
    <form id="form" onSubmit={onSubmit}>
      <h2 className="title-form">Unirse</h2>
      <div className="logo">
        <a href="/"><img src="/img/logo-icon.svg" alt="logo" /></a>
      </div>
      <p className='text-register'>Crea Una Cuenta Para Acceder a Todo el Contenido</p>
      {loading && <span className='loader'></span>}
      {error && <TagError text={error} />}
      <div className="containt-input">
        <input
          className={`${errors.username ? 'error' : 'ok'}`}
          type="text"
          placeholder=""
          autoFocus
          {...register("username", optionsUsername)}
          autoComplete='off' />
        <label>Nombre de Usuario</label>
        {errors.username && <TagError text={errors.username.message} />}
      </div>
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
      <div className="containt-input">
        <input
          className={`${errors.confirmPassword ? 'error' : 'ok'}`}
          type="password"
          placeholder=""
          {...register("confirmPassword", optionsConfirmPassword)}
          autoComplete='off' />
        <label>Confirmar Contraseña</label>
        {errors.confirmPassword && <TagError text={errors.confirmPassword.message} />}
      </div>
      <SetImage userImage={userImage} setUserImage={setUserImage} setError={setError} />
      <div className="options-btns">
        <a href="/">Ya Tengo una Cuenta</a>
        <button type="submit" className="btn-submit btn-register" disabled={loading ? true : false} >Unirse</button>
      </div>
    </form>
  )
}
