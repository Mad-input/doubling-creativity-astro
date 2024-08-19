import { useForm } from 'react-hook-form'
import TagError from './TagError.jsx'
import '../assets/css/stylesFormLogin.css'
import { useEffect, useState } from 'react'
import { registerUser } from '../api/auth.js'

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

  const [error, setError] = useState('')

  const optionsUsername = {
    required: {
      value: true,
      message: "name is required"
    },
    minLength: {
      value: 3,
      message: "minimum trhee characters"
    },
    maxLength: {
      value: 20,
      message: "maximum twenty characters"
    }
  }

  const optionsEmail = {
    required: {
      value: true,
      message: "Email is required",
    },
    pattern: {
      value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/,
      message: 'invalid email'
    }
  }

  const optionsPassword = {
    required: {
      value: true,
      message: "password is required"
    },
    minLength: {
      value: 6,
      message: "must be a minimum of six"
    }
  }

  const optionsConfirmPassword = {
    required: {
      value: true,
      message: "password is required"
    },
    validate: (value) => value === watch('password') ? true : 'passwords do not match'
  }


  const onSubmit = handleSubmit(async (values) => {
    const { username, email, password } = values

    try {
      const data = await registerUser({ name: username, email, password })
      console.log(data.data)
    } catch (error) {
      setError(error.response.data.error)
    }
    reset()
    window.location.replace('/')
  })

  useEffect(() => {
    setTimeout(() => {
      setError('')
    }, 2000);
  }, [error])

  return (
    <form id="form" onSubmit={onSubmit}>
      <h2 className="title-form">Sign Up</h2>
      <div className="logo">
        <a href="/"><img src="/img/logo-icon.svg" alt="logo" /></a>
      </div>
      {error && <TagError text={error}></TagError>}
      <div className="containt-input">
        <input
          className={`${errors.username ? 'error' : 'ok'}`}
          type="text"
          placeholder=""
          autoFocus
          {...register("username", optionsUsername)}
          autoComplete='off' />
        <label>Username</label>
        {errors.username && <TagError text={errors.username.message} />}
      </div>
      <div className="containt-input">
        <input
          className={`${errors.email ? 'error' : 'ok'}`}
          type="email"
          placeholder=""
          {...register("email", optionsEmail)}
          autoComplete='off' />
        <label>Email</label>
        {errors.email && <TagError text={errors.email.message} />}
      </div>
      <div className="containt-input">
        <input
          className={`${errors.password ? 'error' : 'ok'}`}
          type="password"
          placeholder=""
          {...register("password", optionsPassword)}
          autoComplete='off' />
        <label>Password</label>
        {errors.password && <TagError text={errors.password.message} />}
      </div>
      <div className="containt-input">
        <input
          className={`${errors.confirmPassword ? 'error' : 'ok'}`}
          type="password"
          placeholder=""
          {...register("confirmPassword", optionsConfirmPassword)}
          autoComplete='off' />
        <label>Confirm Password</label>
        {errors.confirmPassword && <TagError text={errors.confirmPassword.message} />}
      </div>
      <button type="submit" className="btn-submit">Register</button>
    </form>
  )
}
