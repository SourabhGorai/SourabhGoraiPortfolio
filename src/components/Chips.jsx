export default function Chips({ items, strong = false }) {
  return (
    <ul className={`chips${strong ? ' strong' : ''}`}>
      {items.map((item) => (
        <li key={item}>{item}</li>
      ))}
    </ul>
  )
}
