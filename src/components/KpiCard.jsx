const TREND_META = {
  up: { arrow: '▲', className: 'kpi__change--up' },
  down: { arrow: '▼', className: 'kpi__change--down' },
}

export default function KpiCard({ title, value, change, trend }) {
  const meta = TREND_META[trend]

  return (
    <article className="card">
      <h3 className="card__title">{title}</h3>
      <p className="kpi__value">{value}</p>
      <p className={`kpi__change${meta ? ` ${meta.className}` : ''}`}>
        {meta ? `${meta.arrow} ` : ''}
        {change}
      </p>
    </article>
  )
}
