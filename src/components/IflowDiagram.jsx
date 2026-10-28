import { useId } from 'react'
import './iflow.css'

/* ------------------------------------------------------------------
   SAP CPI-style integration flow, drawn as an animated SVG.
   One loop = D seconds:
     0%–48%  amber packet runs the main flow (each step lights as it arrives)
     29%     packet forks down Branch 2 to the Mail end event
     60%–85% maroon packet runs the exception subprocess to the admin mail
   ------------------------------------------------------------------ */

const D = 14                       // seconds per loop
const Y = 180                      // main process row
const X0 = 44                      // start event
const X1 = 928                     // end event
const t = (x) => `${((((x - X0) / (X1 - X0)) * 0.48) * D).toFixed(2)}s`  // main-flow arrival time
const pct = (p) => `${(p * D).toFixed(2)}s`                               // arbitrary loop position

const steps = [
  { x: 140, type: 'lines',   label: ['Content', 'Modifier 1'] },
  { x: 230, type: 'adapter', label: ['SF Data'], up: true },
  { x: 320, type: 'split',   label: ['General', 'Splitter 1'] },
  { x: 410, type: 'code',    label: ['Groovy', 'Script 1'] },
  { x: 500, type: 'adapter', label: ['Save in', 'S/4HANA'], up: true },
  { x: 662, type: 'lines',   label: ['XSLT', 'Mapping 1'] },
  { x: 752, type: 'grid',    label: ['XML to CSV', 'Converter 1'] },
  { x: 842, type: 'adapter', label: ['Send 1'], up: true },
]

// sequence-flow arrows along the main row: [from-x, to-x]
const seq = [
  [58, 102], [178, 192], [268, 282], [358, 372], [448, 462],
  [538, 560], [600, 624], [700, 714], [790, 804], [880, 914],
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
  return <path d="M1 -8L-4 1H0L-1 8L4 -2H0Z" />   // error (lightning)
}

function Step({ x, type, label, up }) {
  return (
    <g className="ifl-node" style={{ '--d': t(x) }}>
      <rect className="ifl-box" x={x - 38} y={Y - 26} width="76" height="52" rx="8" />
      <g className="ifl-ico" transform={`translate(${x} ${Y})`}><Icon type={type} /></g>
      <text className="ifl-lbl" x={x} y={Y + 46} textAnchor="middle">
        {label.map((l, i) => <tspan key={l} x={x} dy={i ? 14 : 0}>{l}</tspan>)}
      </text>
      {up && <circle className="ifl-dot" cx={x} cy={Y - 26} r="4.5" />}
    </g>
  )
}

function Evt({ x, y, d, end, kind, label, lx, ly, anchor = 'middle' }) {
  return (
    <g className="ifl-node" style={{ '--d': d }}>
      <circle className={`ifl-evt${end ? ' ifl-evt-end' : ''}`} cx={x} cy={y} r="14" />
      <g className="ifl-ico" transform={`translate(${x} ${y})`}><EvtIcon kind={kind} /></g>
      <text className="ifl-lbl" x={lx ?? x} y={ly ?? y + 34} textAnchor={anchor}>{label}</text>
    </g>
  )
}

function Recv({ cx, y, w, label, d }) {
  return (
    <g className="ifl-node-recv" style={{ '--d': d }}>
      <rect className="ifl-recv" x={cx - w / 2} y={y} width={w} height="50" rx="8" />
      <text className="ifl-recv-t" x={cx} y={y + 30} textAnchor="middle">{label}</text>
    </g>
  )
}

export default function IflowDiagram() {
  const id = useId().replace(/:/g, '')
  const arrow = `url(#${id}-a)`

  return (
    <figure className="ifl" style={{ '--dur': `${D}s` }}>
      <svg
        viewBox="0 0 1000 500"
        role="img"
        aria-label="Integration flow: a timer starts the flow, which reads employees from SuccessFactors, splits and maps them, creates them in S/4HANA, converts to CSV and sends it to SFTP. If anything fails, an exception subprocess emails the administrator."
      >
        <defs>
          <marker id={`${id}-a`} viewBox="0 0 10 10" refX="9" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse">
            <path d="M0 0L10 5L0 10z" fill="var(--blue)" />
          </marker>
        </defs>

        {/* pool */}
        <rect className="ifl-pool" x="6" y="112" width="988" height="292" rx="10" />
        <text className="ifl-note ifl-pool-label" x="20" y="134">INTEGRATION PROCESS</text>

        {/* external receivers (top) */}
        <Recv cx={230} y={14} w={150} label="SAP SuccessFactors" d={t(230)} />
        <Recv cx={500} y={14} w={130} label="SAP S/4HANA" d={t(500)} />
        <Recv cx={842} y={14} w={120} label="SFTP Server" d={t(842)} />
        {[230, 500, 842].map((x) => (
          <line key={x} className="ifl-msg" x1={x} y1={Y - 26} x2={x} y2="66" markerEnd={arrow} />
        ))}
        <text className="ifl-note" x="238" y="100">OData</text>
        <text className="ifl-note" x="508" y="100">OData</text>
        <text className="ifl-note" x="850" y="100">SFTP</text>

        {/* main sequence flow */}
        {seq.map(([a, b]) => (
          <line key={a} className="ifl-seq" x1={a} y1={Y} x2={b} y2={Y} markerEnd={arrow} />
        ))}

        <Evt x={X0} y={Y} d={t(X0)} kind="timer" label="Start Timer 1" />
        {steps.map((s) => <Step key={s.x} {...s} />)}

        {/* sequential multicast */}
        <g className="ifl-node" style={{ '--d': t(580) }}>
          <polygon className="ifl-gw" points={`580,${Y - 20} 600,${Y} 580,${Y + 20} 560,${Y}`} />
          <path className="ifl-ico" d={`M573 ${Y}H587M580 ${Y - 7}V${Y + 7}`} />
          <text className="ifl-lbl" x="580" y={Y - 42} textAnchor="middle">
            <tspan x="580">Sequential</tspan><tspan x="580" dy="13">Multicast 1</tspan>
          </text>
        </g>

        <Evt x={X1} y={Y} d={t(X1)} end kind="mail" label="End 2" />

        {/* branch 2 */}
        <line className="ifl-seq" x1="580" y1={Y + 20} x2="580" y2="266" markerEnd={arrow} />
        <text className="ifl-note" x="590" y="242">Branch 2</text>
        <Evt x={580} y={280} d={pct(0.36)} end kind="mail" label="End" lx={602} ly={285} anchor="start" />
        <line className="ifl-msg" x1="580" y1="294" x2="580" y2="428" markerEnd={arrow} />
        <text className="ifl-note" x="588" y="414">Mail</text>
        <Recv cx={580} y={428} w={110} label="Mail" d={pct(0.44)} />

        {/* exception subprocess */}
        <rect className="ifl-sub" x="250" y="290" width="260" height="92" rx="10" />
        <text className="ifl-note" x="380" y="308" textAnchor="middle">Exception Subprocess 1</text>
        <line className="ifl-seq" x1="314" y1="338" x2="446" y2="338" markerEnd={arrow} />
        <Evt x={300} y={338} d={pct(0.6)} kind="bolt" label="Error Start 1" ly={372} />
        <Evt x={460} y={338} d={pct(0.72)} end kind="mail" label="End 1" lx={482} ly={343} anchor="start" />
        <line className="ifl-msg" x1="460" y1="352" x2="460" y2="428" markerEnd={arrow} />
        <text className="ifl-note" x="468" y="414">Mail</text>
        <Recv cx={460} y={428} w={110} label="Admin mail" d={pct(0.82)} />

        {/* travelling packets (drawn last so they sit on top) */}
        <rect className="ifl-pk ifl-pk-main" x={X0 - 7} y={Y - 7} width="14" height="14" rx="4" />
        <rect className="ifl-pk ifl-pk-br" x="573" y={Y - 7} width="14" height="14" rx="4" />
        <rect className="ifl-pk ifl-pk-err" x="293" y="331" width="14" height="14" rx="4" />
      </svg>

      <figcaption className="ifl-legend">
        <span><i className="ok" /> Main flow</span>
        <span><i className="err" /> Error path, runs if any step fails</span>
        <span className="ifl-hint">Hover to pause</span>
      </figcaption>
    </figure>
  )
}