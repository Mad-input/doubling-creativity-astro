import CardTutorial from './CardTutorial.tsx'
import '../assets/css/globalStyles.css'
import { useEffect, useState } from 'react'
import userStorage from '../store/userStore.js'

// Función debounce para retrasar la ejecución del filtro
function debounce (func, delay) {
  let timeoutId
  return (...args) => {
    if (timeoutId) {
      clearTimeout(timeoutId)
    }
    timeoutId = setTimeout(() => {
      func(...args)
    }, delay)
  }
}

export default function ListOfTutorials ({ tutorials }) {
  const [value, setValue] = useState('')
  const [showTutorials, setShowTutorials] = useState(tutorials)
  const { isAuthenticated } = userStorage()

  const handleChange = (e) => {
    setValue(e.target.value)
  }

  const filterTutorials = debounce((searchTerm) => {
    const newTutorials = tutorials.filter(tutorial =>
      tutorial.data.title.toLowerCase().includes(searchTerm.toLowerCase())
    )
    setShowTutorials(newTutorials)
  }, 500) // 500ms de retraso

  // Ejecutar la búsqueda con debounce cuando cambia el valor del input
  useEffect(() => {
    if (value) {
      filterTutorials(value)
    } else {
      setShowTutorials(tutorials) // Mostrar todos los tutoriales si no hay búsqueda
    }
  }, [value])
  return (
    isAuthenticated
      ? <>
        <input type='text' className='input-search' onChange={handleChange} value={value} placeholder='¿Que Quieres Aprender Hoy?' />
        <section className='list-of-tutorials'>
          {!showTutorials.length
            ? <h1>no results found</h1>
            : showTutorials.map(({ slug, data: { title, description, image, category, tags } }) => (
              <CardTutorial
                key={slug}
                title={title}
                description={description}
                image={image}
                link={`/tutorials/${slug}`}
                category={category}
                tags={tags}
              />
            )
            )}
        </section>
      </>
      : <h1 className='noAuthenticated'>Accede Para Ver Todo el Contenido</h1>
  )
}
