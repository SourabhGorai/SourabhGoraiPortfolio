import { education } from '../data/portfolio.js'

export default function Education() {
  return (
    <section id="about">
      <div className="wrap">
        <h2>Education and more</h2>
        <p className="sub">Where I studied, what I’ve completed and how I’ve worked with others.</p>
        <div className="three">
          <div className="card">
            <div className="big">{education.score}</div>
            <h3 style={{ margin: '10px 0 6px' }}>{education.degree}</h3>
            <p>{education.school}</p>
          </div>
          <div className="card">
            <h3>Certifications</h3>
            <ul>{education.certifications.map((c) => <li key={c}>{c}</li>)}</ul>
          </div>
          <div className="card">
            <h3>Activities</h3>
            <ul>{education.activities.map((a) => <li key={a}>{a}</li>)}</ul>
          </div>
        </div>
      </div>
    </section>
  )
}
