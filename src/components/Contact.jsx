import { profile } from '../data/portfolio.js'

export default function Contact() {
  return (
    <section id="contact" className="contact">
      <div className="wrap">
        <h2>Let’s build something that connects.</h2>
        <p>I’m open to conversations about backend, integration and cloud work. Email is the quickest way to reach me.</p>
        <a className="mail" href={`mailto:${profile.email}`}>{profile.email}</a>
        <div className="social">
          <a href={profile.github}>GitHub</a>
          <a href={profile.linkedin}>LinkedIn</a>
          <a href={profile.resume}>Resume (PDF)</a>
          <a href={profile.phoneHref}>{profile.phone}</a>
          <span>{profile.location}</span>
        </div>
      </div>
    </section>
  )
}
