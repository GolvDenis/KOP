import { useState } from 'react'

const COMPARATORS = {
  name: (a, b) => a.name.localeCompare(b.name, 'uk'),
  agency: (a, b) => a.agency.localeCompare(b.agency, 'uk'),
  net: (a, b) => new Date(a.net) - new Date(b.net),
}

export function useSortedLaunches(launches, initialKey = 'net') {
  const [sortKey, setSortKey] = useState(initialKey)
  const [sortDirection, setSortDirection] = useState('asc')

  function toggleSort(key) {
    if (key === sortKey) {
      setSortDirection((direction) => (direction === 'asc' ? 'desc' : 'asc'))
      return
    }

    setSortKey(key)
    setSortDirection('asc')
  }

  const compare = COMPARATORS[sortKey] ?? COMPARATORS.net
  const direction = sortDirection === 'asc' ? 1 : -1
  const sortedLaunches = [...launches].sort((a, b) => compare(a, b) * direction)

  return { sortedLaunches, sortKey, sortDirection, toggleSort }
}
