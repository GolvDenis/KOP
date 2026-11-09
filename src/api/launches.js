const BASE_URL = 'https://ll.thespacedevs.com/2.2.0'

async function getJson(url, signal) {
  const response = await fetch(url, { signal })

  if (response.status === 429) {
    throw new Error('rate-limit')
  }

  if (!response.ok) {
    throw new Error(`http-${response.status}`)
  }

  return response.json()
}

export async function fetchUpcomingLaunches({ limit = 30, signal } = {}) {
  const params = new URLSearchParams({
    net__gte: new Date().toISOString(),
    ordering: 'net',
    limit: String(limit),
  })

  const data = await getJson(`${BASE_URL}/launch/?${params}`, signal)
  return data.results.map(normalizeLaunch)
}

export async function fetchLaunchesThisYear({ signal } = {}) {
  const year = new Date().getFullYear()
  const params = new URLSearchParams({
    net__gte: `${year}-01-01T00:00:00Z`,
    net__lte: `${year}-12-31T23:59:59Z`,
    limit: '1',
  })

  const data = await getJson(`${BASE_URL}/launch/?${params}`, signal)
  return data.count
}

function normalizeLaunch(raw) {
  return {
    id: raw.id,
    name: raw.mission?.name ?? raw.name,
    agency: raw.launch_service_provider?.name ?? 'Невідома агенція',
    rocket: raw.rocket?.configuration?.name ?? '—',
    pad: raw.pad?.name ?? '—',
    status: raw.status?.abbrev ?? '—',
    net: raw.net,
  }
}
