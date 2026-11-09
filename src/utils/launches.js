const DATE_FORMATTER = new Intl.DateTimeFormat('uk-UA', {
  day: 'numeric',
  month: 'short',
  year: 'numeric',
  hour: '2-digit',
  minute: '2-digit',
})

const RELATIVE_FORMATTER = new Intl.RelativeTimeFormat('uk', {
  numeric: 'auto',
})

const MINUTE_MS = 60 * 1000
const HOUR_MS = 60 * MINUTE_MS
const DAY_MS = 24 * HOUR_MS

export function getNearestLaunch(launches) {
  return launches.reduce((nearest, launch) => {
    if (!nearest) return launch
    return new Date(launch.net) < new Date(nearest.net) ? launch : nearest
  }, null)
}

export function formatLaunchDate(iso) {
  return DATE_FORMATTER.format(new Date(iso))
}

export function formatRelativeLaunch(iso) {
  const diffMs = new Date(iso) - new Date()

  if (Math.abs(diffMs) < HOUR_MS) {
    return RELATIVE_FORMATTER.format(Math.round(diffMs / MINUTE_MS), 'minute')
  }

  if (Math.abs(diffMs) < DAY_MS) {
    return RELATIVE_FORMATTER.format(Math.round(diffMs / HOUR_MS), 'hour')
  }

  return RELATIVE_FORMATTER.format(Math.round(diffMs / DAY_MS), 'day')
}
