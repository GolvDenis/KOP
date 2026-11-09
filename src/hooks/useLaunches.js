import { useCallback } from 'react'
import { fetchLaunches } from '../api/launches.js'
import { getAgencyOptions, hasActiveFilters } from '../utils/filters.js'
import { useFetch } from './useFetch.js'

let cachedAgencyOptions = []
let hasCapturedAgencyOptions = false

export function useLaunches(filters = {}) {
  const queryKey = JSON.stringify(filters)
  const fetcher = useCallback(
    async (signal) => {
      const result = await fetchLaunches(filters, { signal })

      if (!hasCapturedAgencyOptions && !hasActiveFilters(filters)) {
        cachedAgencyOptions = getAgencyOptions(result.items)
        hasCapturedAgencyOptions = true
      }

      return result
    },
    [filters],
  )
  const { data, loading, error, refetch } = useFetch(fetcher, queryKey)

  let errorMessage = null

  if (error) {
    errorMessage =
      error.message === 'rate-limit'
        ? 'Перевищено ліміт запитів до API. Спробуйте пізніше.'
        : 'Не вдалося завантажити дані. Перевірте з’єднання.'
  }

  return {
    launches: data?.items ?? [],
    totalCount: data?.totalCount ?? 0,
    agencyOptions: cachedAgencyOptions,
    loading,
    error: errorMessage,
    retry: refetch,
  }
}
