const BASE_URL = 'https://ll.thespacedevs.com/2.2.0'
const TABLE_LIMIT = 30

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

export async function fetchLaunches(filters = {}, { signal } = {}) {
  const params = buildLaunchParams(filters)
  const data = await getJson(`${BASE_URL}/launch/?${params}`, signal)

  return {
    items: (data.results ?? []).map(normalizeLaunch),
    totalCount: data.count ?? 0,
  }
}

function buildLaunchParams({
  search = '',
  agency = '',
  status = '',
  dateFrom = '',
  dateTo = '',
} = {}) {
  const now = new Date()
  const from = dateFrom ? new Date(`${dateFrom}T00:00:00`) : now
  const netGte = from > now ? from : now

  const params = new URLSearchParams({
    net__gte: netGte.toISOString(),
    ordering: 'net',
    limit: String(TABLE_LIMIT),
  })

  if (search.trim()) params.set('search', search.trim())
  if (agency) params.set('lsp__name', agency)
  if (status) params.set('status', status)
  if (dateTo) {
    params.set('net__lte', new Date(`${dateTo}T23:59:59.999`).toISOString())
  }

  return params
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
