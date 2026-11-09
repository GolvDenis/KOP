export default function KpiCard({ title, value, caption }) {
  return (
    <article className="card">
      <h3 className="card__title">{title}</h3>
      <p className="kpi__value">{value}</p>
      {caption && <p className="kpi__caption">{caption}</p>}
    </article>
  )
}
