const UNKNOWN_AGENCY = 'Невідома агенція'

export function hasActiveFilters(filters) {
  return Object.values(filters).some((value) => value !== '')
}

export function getAgencyOptions(launches) {
  return [...new Set(launches.map((launch) => launch.agency))]
    .filter((agency) => agency && agency !== UNKNOWN_AGENCY)
    .sort((a, b) => a.localeCompare(b, 'uk'))
}
