import CardTutorial from "./CardTutorial.tsx";
import '../assets/css/globalStyles.css'
import { useEffect, useState } from "react";

// Función debounce para retrasar la ejecución del filtro
function debounce(func, delay) {
  let timeoutId;
  return (...args) => {
    if (timeoutId) {
      clearTimeout(timeoutId);
    }
    timeoutId = setTimeout(() => {
      func(...args);
    }, delay);
  };
}

export default function ListOfTutorials({ tutorials }) {
  const [value, setValue] = useState("")
  const [showTutorials, setShowTutorials] = useState(tutorials)

  const handleChange = (e) => {
    setValue(e.target.value)
  }

  const filterTutorials = debounce((searchTerm) => {
    const newTutorials = tutorials.filter(tutorial =>
      tutorial.data.title.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setShowTutorials(newTutorials);
  }, 500); // 500ms de retraso

  // Ejecutar la búsqueda con debounce cuando cambia el valor del input
  useEffect(() => {
    if (value) {
      filterTutorials(value);
    } else {
      setShowTutorials(tutorials); // Mostrar todos los tutoriales si no hay búsqueda
    }
  }, [value]);
  return (
    <>
      <input type="text" className="input-search" onChange={handleChange} value={value} placeholder="What do you want to learn?" />
      <section className="list-of-tutorials">
        {!showTutorials.length
          ?
          <h1>no results found</h1>
          :
          showTutorials.map(({ slug, data: { title, description, image, category, tags } }) => (
            <CardTutorial
              key={slug}
              title={title}
              description={description}
              image={image}
              link={`/tutorials/${slug}`}
              category={category}
              tags={tags}
            />
          ),
          )
        }
      </section>
    </>
  )
}
