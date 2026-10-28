export default function LinkButtons({ links }) {
  if (!links?.length) return null
  return (
    <div className="links">
      {links.map((l) => (
        <a key={l.label} className={`btn sm${l.ghost ? ' ghost' : ''}`} href={l.href}>
          {l.label}
        </a>
      ))}
    </div>
  )
}
