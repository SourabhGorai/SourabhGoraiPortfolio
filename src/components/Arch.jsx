import { Fragment } from 'react'

// A small left-to-right diagram: Arch title + steps joined by arrows.
export default function Arch({ title, steps }) {
  return (
    <div className="arch">
      <b>{title}</b>
      {steps.map((step, i) => (
        <Fragment key={step}>
          {i > 0 && <em>→</em>}
          <span>{step}</span>
        </Fragment>
      ))}
    </div>
  )
}
