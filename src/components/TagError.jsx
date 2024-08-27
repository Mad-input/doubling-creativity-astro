export default function TagError({ text }) {
  return (
    <p className="tag-error" style={{ color: 'var(--color-error)' }}>{text}</p>
  )
}
