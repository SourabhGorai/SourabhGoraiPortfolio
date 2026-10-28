import './flowchart.css'

// Renders each entry of `flows` ({ title, steps[] }) as an animated pipeline.
// A packet travels along the track and each step lights up as it arrives.
// Flows whose title mentions "fail" or "error" get the dashed "error path" style.
export default function FlowChart({ flows }) {
  return (
    <div className="fc-wrap">
      {flows.map((f) => {
        const n = f.steps.length
        const isFail = /fail|error/i.test(f.title)
        return (
          <figure
            className={`fc${isFail ? ' fc-fail' : ''}`}
            key={f.title}
            style={{ '--n': n, '--last': Math.max(n - 1, 1) }}
          >
            <figcaption className="fc-title">{f.title}</figcaption>

            <div className="fc-body">
              <div className="fc-track" aria-hidden="true">
                <span className="fc-packet" />
              </div>

              <ol className="fc-steps">
                {f.steps.map((s, i) => (
                  <li className="fc-step" style={{ '--i': i }} key={s}>
                    <span className="fc-dot">{i + 1}</span>
                    <span className="fc-label">{s}</span>
                  </li>
                ))}
              </ol>
            </div>
          </figure>
        )
      })}
    </div>
  )
}