import { useEffect, useId, useRef } from 'react'
import './IFlow.css'

/* ------------------------------------------------------------------
   Portrait version of the SAP CPI iFlow diagram, for phones and tablets.
   Same look and the same animation engine as IflowDiagram.jsx:
   one requestAnimationFrame loop, steps lit by toggling `is-lit`,
   paused while offscreen, tap to pause, no motion if reduced-motion is on.

   Layout: main flow runs top -> bottom in the pool on the left, external
   systems sit in a column on the right, the exception subprocess is at
   the bottom. One loop = D seconds (same timeline as the desktop version).
   ------------------------------------------------------------------ */

const D = 14
const CX = 108                       // x of the main flow column
const T0 = 60                        // y of the start event
const T1 = 636                       // y of the final end event
const LIT = 0.12
const at = (y) => ((y - T0) / (T1 - T0)) * 0.48   // when the main packet reaches y

const BX = CX - 68                   // left edge of a step box (box is 136 x 44)
const RX = 224                       // left edge of the receiver column (boxes are 100 x 44)

const steps = [
  { y: 112, type: 'lines',   label: ['Content', 'Modifier 1'] },
  { y: 172, type: 'adapter', label: ['SF Data'],              proto: 'OData', recv: ['SAP', 'SuccessFactors'] },
  { y: 232, type: 'split',   label: ['General', 'Splitter 1'] },
  { y: 292, type: 'code',    label: ['Groovy', 'Script 1'] },
  { y: 352, type: 'adapter', label: ['Save in', 'S/4HANA'],   proto: 'OData', recv: ['SAP S/4HANA'] },
  { y: 464, type: 'lines',   label: ['XSLT', 'Mapping 1'] },
  { y: 524, type: 'grid',    label: ['XML to CSV', 'Converter 1'] },
  { y: 584, type: 'adapter', label: ['Send 1'],               proto: 'SFTP',  recv: ['SFTP Server'] },
]

// sequence arrows down the main column: [from-y, to-y]
const seq = [
  [74, 90], [134, 150], [194, 210], [254, 270], [314, 330],
  [374, 390], [426, 442], [486, 502], [546, 562], [606, 622],
]

function Icon({ type }) {
  switch (type) {
    case 'lines':   return <path d="M-9 -6H9M-9 0H9M-9 6H4" />
    case 'adapter': return (<><circle r="9" /><circle r="3.5" /></>)
    case 'split':   return <path d="M-10 0H-1M-1 0L9 -7M-1 0L9 7" />
    case 'code':    return <path d="M-3 -6L-10 0L-3 6M3 -6L10 0L3 6" />
    case 'grid':    return (
      <>
        <rect x="-9" y="-9" width="7" height="7" /><rect x="2" y="-9" width="7" height="7" />
        <rect x="-9" y="2" width="7" height="7" /><rect x="2" y="2" width="7" height="7" />
      </>
    )
    default: return null
  }
}

function EvtIcon({ kind }) {
  if (kind === 'timer') return (<><circle r="7" /><path d="M0 -4V0H3.5" /></>)
  if (kind === 'mail')  return (<><rect x="-7" y="-5" width="14" height="10" rx="1.5" /><path d="M-7 -4L0 1L7 -4" /></>)
  return <path d="M1 -8L-4 1H0L-1 8L4 -2H0Z" />
}

function Evt({ x, y, when, end, kind, label, lx, ly, anchor = 'middle' }) {
  return (
    <g className="ifl-node" data-at={when}>
      <circle className={`ifl-evt${end ? ' ifl-evt-end' : ''}`} cx={x} cy={y} r="14" />
      <g className="ifl-ico" transform={`translate(${x} ${y})`}><EvtIcon kind={kind} /></g>
      <text className="ifl-lbl" x={lx ?? x} y={ly ?? y + 34} textAnchor={anchor}>{label}</text>
    </g>
  )
}

function Recv({ y, lines, when }) {
  const two = lines.length === 2
  return (
    <g className="ifl-node-recv" data-at={when}>
      <rect className="ifl-recv" x={RX} y={y - 22} width="100" height="44" rx="8" />
      <text className="ifl-recv-t" x={RX + 50} y={two ? y - 3 : y + 4.5} textAnchor="middle">
        {lines.map((l, i) => <tspan key={l} x={RX + 50} dy={i ? 14 : 0}>{l}</tspan>)}
      </text>
    </g>
  )
}

function Step({ y, type, label }) {
  const two = label.length === 2
  return (
    <g className="ifl-node" data-at={at(y)}>
      <rect className="ifl-box" x={BX} y={y - 22} width="136" height="44" rx="8" />
      <g className="ifl-ico" transform={`translate(${BX + 24} ${y})`}><Icon type={type} /></g>
      <text className="ifl-in" x={BX + 46} y={two ? y - 3 : y + 4}>
        {label.map((l, i) => <tspan key={l} x={BX + 46} dy={i ? 14 : 0}>{l}</tspan>)}
      </text>
    </g>
  )
}

function Packet({ cls, x, y }) {
  return (
    <g className={`ifl-pk ${cls}`} transform={`translate(${x} ${y})`} opacity="0">
      <circle className="ifl-halo" r="9" />
      <circle className="ifl-core" r="5" />
    </g>
  )
}

export default function IflowMobile() {
  const id = useId().replace(/:/g, '')
  const arrow = `url(#${id}-a)`
  const rootRef = useRef(null)

  useEffect(() => {
    const root = rootRef.current
    if (!root) return
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return

    const nodes = [...root.querySelectorAll('[data-at]')].map((el) => ({
      el, at: parseFloat(el.dataset.at), lit: false,
    }))
    const pk = {
      main: { el: root.querySelector('.ifl-pk-main'), shown: false },
      br:   { el: root.querySelector('.ifl-pk-br'),   shown: false },
      err:  { el: root.querySelector('.ifl-pk-err'),  shown: false },
    }
    const clamp = (v) => Math.min(1, Math.max(0, v))
    const lerp = (a, b, p) => a + (b - a) * clamp(p)
    const place = (p, x, y, o) => {
      p.el.setAttribute('transform', `translate(${x.toFixed(1)} ${y.toFixed(1)})`)
      p.el.setAttribute('opacity', o.toFixed(2))
      p.shown = true
    }
    const hide = (p) => { if (p.shown) { p.el.setAttribute('opacity', '0'); p.shown = false } }

    const frame = (t) => {
      // main flow: start event down to the final end event
      const om = t < 0.48 ? clamp(t / 0.015) : 1 - clamp((t - 0.48) / 0.03)
      if (om > 0) place(pk.main, CX, lerp(T0, T1, t / 0.48), om)
      else hide(pk.main)

      // branch 2: forks right at the multicast, to End, then to the Mail receiver
      if (t >= 0.29 && t <= 0.47) {
        const x = t < 0.36 ? lerp(CX, 184, (t - 0.29) / 0.07) : lerp(184, RX, (t - 0.36) / 0.08)
        const o = t < 0.44 ? 1 : 1 - clamp((t - 0.44) / 0.03)
        place(pk.br, x, 408, o)
      } else hide(pk.br)

      // error path: Error Start -> End 1 -> Admin mail
      if (t >= 0.6 && t <= 0.85) {
        const o = t < 0.61 ? (t - 0.6) / 0.01 : t < 0.82 ? 1 : 1 - clamp((t - 0.82) / 0.03)
        const x = t < 0.72 ? lerp(60, 160, (t - 0.61) / 0.11) : lerp(160, RX, (t - 0.72) / 0.1)
        place(pk.err, x, 724, o)
      } else hide(pk.err)

      for (const n of nodes) {
        const lit = ((t - n.at + 1) % 1) < LIT
        if (lit !== n.lit) { n.lit = lit; n.el.classList.toggle('is-lit', lit) }
      }
    }

    let raf = 0, last = 0, elapsed = 0, paused = false
    const tick = (now) => {
      raf = requestAnimationFrame(tick)
      const dt = last ? Math.min(now - last, 100) : 0
      last = now
      if (paused) return
      elapsed = (elapsed + dt / 1000) % D
      frame(elapsed / D)
    }

    const io = new IntersectionObserver(([entry]) => {
      cancelAnimationFrame(raf)
      if (entry.isIntersecting) { last = 0; raf = requestAnimationFrame(tick) }
    })
    io.observe(root)

    const toggle = () => { paused = !paused }      // tap to pause / resume
    root.addEventListener('click', toggle)

    return () => {
      cancelAnimationFrame(raf)
      io.disconnect()
      root.removeEventListener('click', toggle)
    }
  }, [])

  return (
    <figure className="ifl ifl-vert" ref={rootRef}>
      <svg
        viewBox="0 0 330 800"
        role="img"
        aria-label="Integration flow, top to bottom: a timer starts the flow, which reads employees from SuccessFactors, splits and maps them, creates them in S/4HANA, converts to CSV and sends it to SFTP. A second branch sends a mail. If anything fails, an exception subprocess emails the administrator."
      >
        <defs>
          <marker id={`${id}-a`} viewBox="0 0 10 10" refX="9" refY="5" markerWidth="5" markerHeight="5" orient="auto-start-reverse">
            <path d="M0 0L10 5L0 10z" fill="var(--blue)" />
          </marker>
        </defs>

        {/* pool */}
        <rect className="ifl-pool" x="4" y="8" width="202" height="784" rx="10" />
        <text className="ifl-note ifl-pool-label" x="16" y="28">INTEGRATION PROCESS</text>

        {/* sequence arrows down the main column */}
        {seq.map(([a, b]) => (
          <line key={a} className="ifl-seq" x1={CX} y1={a} x2={CX} y2={b} markerEnd={arrow} />
        ))}

        <Evt x={CX} y={T0} when={at(T0)} kind="timer" label="Start Timer 1" lx={CX + 24} ly={T0 + 4} anchor="start" />
        {steps.map((s) => <Step key={s.y} {...s} />)}

        {/* adapters -> external systems (right column) */}
        {steps.filter((s) => s.proto).map((s) => (
          <g key={`ext-${s.y}`}>
            <line className="ifl-msg" x1={BX + 136} y1={s.y} x2={RX} y2={s.y} markerEnd={arrow} />
            <circle className="ifl-dot" cx={BX + 136} cy={s.y} r="4.5" />
            <text className="ifl-note" x={BX + 142} y={s.y - 7}>{s.proto}</text>
            <Recv y={s.y} lines={s.recv} when={at(s.y)} />
          </g>
        ))}

        {/* sequential multicast */}
        <g className="ifl-node" data-at={at(408)}>
          <polygon className="ifl-gw" points={`${CX},390 ${CX + 18},408 ${CX},426 ${CX - 18},408`} />
          <path className="ifl-ico" d={`M${CX - 7} 408H${CX + 7}M${CX} 401V415`} />
          <text className="ifl-lbl" x={CX - 24} y="405" textAnchor="end">
            <tspan x={CX - 24}>Sequential</tspan><tspan x={CX - 24} dy="13">Multicast 1</tspan>
          </text>
        </g>

        <Evt x={CX} y={T1} when={at(T1)} end kind="mail" label="End 2" lx={CX + 24} ly={T1 + 4} anchor="start" />

        {/* branch 2: right to End, then to the Mail receiver */}
        <line className="ifl-seq" x1={CX + 18} y1="408" x2="170" y2="408" markerEnd={arrow} />
        <text className="ifl-note" x="148" y="424" textAnchor="middle">Branch 2</text>
        <Evt x={184} y={408} when={0.36} end kind="mail" label="End" ly={386} />
        <line className="ifl-msg" x1="198" y1="408" x2={RX} y2="408" markerEnd={arrow} />
        <text className="ifl-note" x="211" y="400" textAnchor="middle">Mail</text>
        <Recv y={408} lines={['Mail']} when={0.44} />

        {/* exception subprocess */}
        <rect className="ifl-sub" x="18" y="676" width="178" height="100" rx="10" />
        <text className="ifl-note" x="107" y="695" textAnchor="middle">Exception Subprocess 1</text>
        <line className="ifl-seq" x1="74" y1="724" x2="146" y2="724" markerEnd={arrow} />
        <Evt x={60} y={724} when={0.6} kind="bolt" label="Error Start 1" ly={758} />
        <Evt x={160} y={724} when={0.72} end kind="mail" label="End 1" ly={758} />
        <line className="ifl-msg" x1="174" y1="724" x2={RX} y2="724" markerEnd={arrow} />
        <text className="ifl-note" x="199" y="716" textAnchor="middle">Mail</text>
        <Recv y={724} lines={['Admin mail']} when={0.82} />

        {/* travelling packets (drawn last so they sit on top) */}
        <Packet cls="ifl-pk-main" x={CX} y={T0} />
        <Packet cls="ifl-pk-br" x={CX} y={408} />
        <Packet cls="ifl-pk-err" x={60} y={724} />
      </svg>

      <figcaption className="ifl-legend">
        <span><i className="ok" /> Main flow</span>
        <span><i className="err" /> Error path</span>
        <span className="ifl-hint">Tap to pause</span>
      </figcaption>
    </figure>
  )
}