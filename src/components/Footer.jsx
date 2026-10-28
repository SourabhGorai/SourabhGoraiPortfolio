import { profile } from '../data/portfolio.js'

export default function Footer() {
  return (
    <footer>
      <div className="wrap">
        <span>© {new Date().getFullYear()} {profile.name}</span>
        <a href="#top">Back to top</a>
      </div>
    </footer>
  )
}
