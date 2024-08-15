import { useForm } from "react-hook-form"
import '../assets/css/stylesFormLogin.css'
import TagError from './TagError'

export default function FormLogin() {

    const {
        register,
        handleSubmit,
        formState: {errors}
    } = useForm()

    const onSubmit = handleSubmit((values) => {
        console.log(values);
    })

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
        }
      }

  return (
    <dialog className="dialog-modal">
        <form id="form" onSubmit={onSubmit} method="dialog">
            <button className="btn-close-modal" type="button">
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
            <h2 className="title-form">Log in</h2>
            <div className="logo">
                <a href="/"><img src="/img/logo-icon.svg" alt="logo" /></a>
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
            
            <button type="submit" className="btn-submit">Login</button>
        </form>
    </dialog>
  )
}
