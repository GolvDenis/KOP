import KpiCard from './KpiCard.jsx'
import { formatLaunchDate, formatRelativeLaunch } from '../utils/launches.js'

export default function KpiRow({
  nearest,
  totalCount,
  isLoading,
  hasError,
}) {
  let nearestValue = '—'
  let nearestCaption = 'Немає майбутніх запусків'

  if (isLoading) {
    nearestValue = '…'
    nearestCaption = 'Завантаження…'
  } else if (hasError) {
    nearestCaption = 'Дані недоступні'
  } else if (nearest) {
    nearestValue = formatRelativeLaunch(nearest.net)
    nearestCaption = `${nearest.name} · ${formatLaunchDate(nearest.net)}`
  }

  let countValue = totalCount
  let countCaption = 'За фільтром · Launch Library 2'

  if (isLoading) {
    countValue = '…'
    countCaption = 'Завантаження…'
  } else if (hasError) {
    countValue = '—'
    countCaption = 'Дані недоступні'
  }

  return (
    <div className="kpi-row">
      <KpiCard
        title="Найближчий запуск"
        value={nearestValue}
        caption={nearestCaption}
      />
      <KpiCard
        title="Майбутніх запусків"
        value={countValue}
        caption={countCaption}
      />
    </div>
  )
}
