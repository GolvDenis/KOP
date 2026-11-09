import { useCallback, useEffect, useRef, useState } from 'react'

export function useFetch(fetcher, queryKey) {
  const [data, setData] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [reloadKey, setReloadKey] = useState(0)
  const fetcherRef = useRef(fetcher)

  useEffect(() => {
    fetcherRef.current = fetcher
  }, [fetcher])

  useEffect(() => {
    const controller = new AbortController()
    let active = true

    async function load() {
      setLoading(true)
      setError(null)

      try {
        const result = await fetcherRef.current(controller.signal)

        if (active) setData(result)
      } catch (err) {
        if (!active || err.name === 'AbortError') return

        setError(err)
      } finally {
        if (active) setLoading(false)
      }
    }

    load()

    return () => {
      active = false
      controller.abort()
    }
  }, [queryKey, reloadKey])

  const refetch = useCallback(() => {
    setReloadKey((key) => key + 1)
  }, [])

  return { data, loading, error, refetch }
}
