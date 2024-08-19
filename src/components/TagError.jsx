export default function TagError({ text }) {
  return (
    <span className="tag-error" style={{ color: 'var(--color-error)' }}>{text}</span>
  )
}
