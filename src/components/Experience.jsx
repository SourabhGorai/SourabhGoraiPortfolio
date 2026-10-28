import { experience } from '../data/portfolio.js'
import IflowDiagram from './IflowDiagram.jsx'
import IflowMobile from './IflowMobile.jsx'
import LinkButtons from './LinkButtons.jsx'

export default function Experience() {
  return (
    <section id="experience">
      <div className="wrap">
        <h2>Experience</h2>
        <p className="sub">Where I’m building my enterprise integration skills.</p>
        <div className="tl">
          {experience.map((job) => (
            <div className="job" key={job.title}>
              <div className="when">{job.when}</div>
              <h3>{job.title}</h3>
              <div className="org">{job.org}</div>
              <ul>
                {job.bullets.map((b) => <li key={b}>{b}</li>)}
              </ul>

              {job.case && (
                <div className="case">
                  <h4>{job.case.title}</h4>
                  <p>{job.case.desc}</p>
                  {/* wide screens: SAP-style iFlow diagram */}
                  <div className="ifl-desktop"><IflowDiagram /></div>
                  {/* phones and small tablets: portrait version of the same diagram */}
                  <div className="ifl-mobile"><IflowMobile /></div>
                  <h5>Problems I solved</h5>
                  <ul>
                    {job.case.solved.map((s) => <li key={s}>{s}</li>)}
                  </ul>
                  <LinkButtons links={job.case.links} />
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}