import { skills } from '../data/portfolio.js'
import Chips from './Chips.jsx'

export default function Skills() {
  return (
    <section id="skills">
      <div className="wrap">
        <h2>Skills</h2>
        <p className="sub">My strongest tools first, then everything else I work with.</p>
        <div className="skills">
          <div className="card wide">
            <h3>Where I’m strongest</h3>
            <Chips items={skills.strongest} strong />
          </div>
          {skills.groups.map((g) => (
            <div className="card" key={g.title}>
              <h3>{g.title}</h3>
              <Chips items={g.items} />
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
