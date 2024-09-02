interface Props {
  title: string;
  description: string;
  image: string;
  link: string;
  category: string;
  tags: Array<String>
}

export default function CardTutorial({ title, description, image, link, category, tags }: Props) {
  return (
    <article className="card-article">
      <div className="image-container">
        <img src={image} alt="image of art doubling creativity" />
      </div>
      <div className="content">
        <h2 className="card-title">{title}</h2>
        <p className="card-description">{description}</p>
        <p className="category"><span>Categoría</span>: <strong>{category}</strong></p>
        <p className="tags">
          {tags.map((tag, i) => (
            <span className="tag" key={i}>{tag}</span>
          ))}
        </p>
        <a href={link}>Quiero aprender!</a>
      </div>
    </article>
  )
}
