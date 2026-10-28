import { nav, profile } from '../data/portfolio.js'

export default function Header() {
  return (
    <header>
      <nav className="wrap" aria-label="Main">
        <a className="logo" href="#top">{profile.name}</a>
        <ul>
          {nav.map((n) => (
            <li key={n.href}><a href={n.href}>{n.label}</a></li>
          ))}
        </ul>
        <a className="btn" href="#contact">Contact me</a>
      </nav>
    </header>
  )
}
