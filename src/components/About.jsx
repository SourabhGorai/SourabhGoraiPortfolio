import { about, profile } from '../data/portfolio.js'

export default function About() {
  return (
    <section id="me">
      <div className="wrap me">
        <div className="photo" aria-label="Photo">
          {profile.photo ? <img src={profile.photo} alt={profile.name} /> : 'SG'}
        </div>
        <div>
          <h2>About me</h2>
          <p className="big-p">{about.intro}</p>
          <p>{about.body}</p>
          <div className="sec">
            <h3>{about.focusTitle}</h3>
            <p>{about.focus}</p>
          </div>
        </div>
      </div>
    </section>
  )
}
