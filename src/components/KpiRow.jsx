import KpiCard from './KpiCard.jsx'
import { formatLaunchDate, formatRelativeLaunch } from '../utils/launches.js'

export default function KpiRow({ nearest, launchesThisYear, isLoading, hasError }) {
  const year = new Date().getFullYear()

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

  let countValue = launchesThisYear
  let countCaption = `${year} · Launch Library 2`

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
        title="Запусків цьогоріч"
        value={countValue}
        caption={countCaption}
      />
    </div>
  )
}
