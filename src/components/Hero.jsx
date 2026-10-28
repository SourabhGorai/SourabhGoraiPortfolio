import { hero, profile } from '../data/portfolio.js'

export default function Hero() {
  return (
    <div className="wrap hero">
      <div className="hello"><i></i>{profile.status}</div>
      <h1>I build backends that make systems <em>talk to each other</em>.</h1>
      <p className="lead">{hero.lead}</p>
      <div className="actions">
        <a className="btn" href="#projects">See my projects</a>
        <a className="btn ghost" href="#contact">Get in touch</a>
        <a className="btn ghost" href={profile.resume}>Download resume</a>
      </div>

      <div className="flow" aria-label="Diagram of a message moving through an integration flow">
        <div className="nodes">
          <div className="track"><span className="packet"></span><span className="packet b"></span></div>
          {hero.flow.map((node, i) => (
            <div className="node" key={node.title}>
              <div className="dot">{i + 1}</div>
              <div><b>{node.title}</b><span>{node.text}</span></div>
            </div>
          ))}
        </div>
        <p>{hero.caption}</p>
      </div>
    </div>
  )
}
