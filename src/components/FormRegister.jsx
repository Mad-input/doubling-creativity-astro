import { useForm } from 'react-hook-form'
import TagError from './TagError.jsx'
import '../assets/css/stylesFormLogin.css'
import { useEffect, useState } from 'react'
import userStore from '../store/userStore.js';

const MAX_FILE_SIZE = 2 * 1024 * 1024;

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

  const resizeImage = (file) => {
    return new Promise((resolve) => {
      const reader = new FileReader();
      reader.onload = (event) => {
        const img = new Image();
        img.onload = () => {
          const canvas = document.createElement('canvas');
          const maxWidth = 300; // Ancho máximo deseado
          const maxHeight = 300; // Alto máximo deseado

          let width = img.width;
          let height = img.height;

          // Mantener la relación de aspecto
          if (width > height) {
            if (width > maxWidth) {
              height *= maxWidth / width;
              width = maxWidth;
            }
          } else {
            if (height > maxHeight) {
              width *= maxHeight / height;
              height = maxHeight;
            }
          }

          canvas.width = width;
          canvas.height = height;
          const ctx = canvas.getContext('2d');
          ctx.drawImage(img, 0, 0, width, height);

          // Convertir la imagen redimensionada a base64
          resolve(canvas.toDataURL(file.type));
        };
        img.src = event.target.result;
      };
      reader.readAsDataURL(file);
    });
  };

  const handleImageChange = async (e) => {
    const file = e.target.files[0];

    // Verifica el tamaño del archivo
    if (file && file.size > MAX_FILE_SIZE) {
      setError('El tamaño de la imagen es demasiado grande. El máximo es 2MB.');
      return;
    } else {
      setError('');
    }

    if (file) {
      const resizedImage = await resizeImage(file)
      setUserImage(resizedImage)
    }
  };

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
      <h2 className="title-form">Sign Up</h2>
      <div className="logo">
        <a href="/"><img src="/img/logo-icon.svg" alt="logo" /></a>
      </div>
      <p className='text-register'>Create an account and access all our content</p>
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
      <div className="image-user-cotainer">
        <label>
          <span>Select a profile image</span>
          <input type="file" accept='img/*' className='input-file-user' onChange={handleImageChange} />
          <div className="preview-image">
            <img src={userImage} />
          </div>
        </label>
      </div>
      <div className="options-btns">
        <a href="#">I already have an account</a>
        <button type="submit" className="btn-submit btn-register" disabled={loading ? true : false} >Sign Up</button>
      </div>
    </form>
  )
}
