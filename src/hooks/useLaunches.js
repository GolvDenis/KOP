import { useEffect, useState } from 'react'
import {
  fetchLaunchesThisYear,
  fetchUpcomingLaunches,
} from '../api/launches.js'

export function useLaunches() {
  const [launches, setLaunches] = useState([])
  const [launchesThisYear, setLaunchesThisYear] = useState(0)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState(null)
  const [reloadKey, setReloadKey] = useState(0)

  useEffect(() => {
    const controller = new AbortController()
    let active = true

    async function load() {
      setIsLoading(true)
      setError(null)

      try {
        const [upcoming, yearCount] = await Promise.all([
          fetchUpcomingLaunches({ signal: controller.signal }),
          fetchLaunchesThisYear({ signal: controller.signal }),
        ])

        if (!active) return

        setLaunches(upcoming)
        setLaunchesThisYear(yearCount)
      } catch (err) {
        if (!active || err.name === 'AbortError') return

        setError(
          err.message === 'rate-limit'
            ? 'Перевищено ліміт запитів до API. Спробуйте пізніше.'
            : 'Не вдалося завантажити дані. Перевірте з’єднання.',
        )
      } finally {
        if (active) setIsLoading(false)
      }
    }

    load()

    return () => {
      active = false
      controller.abort()
    }
  }, [reloadKey])

  function retry() {
    setReloadKey((key) => key + 1)
  }

  return { launches, launchesThisYear, isLoading, error, retry }
}
