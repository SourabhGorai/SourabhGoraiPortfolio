import { projects, profile } from '../data/portfolio.js'
import Arch from './Arch.jsx'
import Chips from './Chips.jsx'
import LinkButtons from './LinkButtons.jsx'

export default function Projects() {
  return (
    <section id="projects">
      <div className="wrap">
        <h2>Projects</h2>
        <p className="sub">
          The ones I’m proudest of, built end to end.{' '}
          <a href={profile.github} style={{ color: 'var(--blue)', fontWeight: 600 }}>See more on GitHub</a>
        </p>

        {projects.map((p) => (
          <article className="proj" key={p.title}>
            <div>
              <h3>{p.title}</h3>
              <div className="what">
                {p.what}
                {p.badge && <span className="badge">{p.badge}</span>}
              </div>
              <p>{p.desc}</p>
              {p.chips && <Chips items={p.chips} />}
              <LinkButtons links={p.links} />
              {p.note && <p className="note">{p.note}</p>}
            </div>
            <ul>
              {p.bullets.map((b) => <li key={b}>{b}</li>)}
            </ul>
            {p.arch && <Arch title="How it fits together" steps={p.arch} />}
          </article>
        ))}
      </div>
    </section>
  )
}
