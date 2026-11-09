import { useMemo } from 'react'
import { useForm, useWatch } from 'react-hook-form'
import FiltersForm from '../components/FiltersForm.jsx'
import KpiRow from '../components/KpiRow.jsx'
import MissionsTable from '../components/MissionsTable.jsx'
import QueryState from '../components/QueryState.jsx'
import { DEFAULT_FILTERS } from '../constants/launchFilters.js'
import { useDebounce } from '../hooks/useDebounce.js'
import { useLaunches } from '../hooks/useLaunches.js'
import { useSortedLaunches } from '../hooks/useSortedLaunches.js'
import { getNearestLaunch } from '../utils/launches.js'

export default function Dashboard() {
  const { control, reset } = useForm({
    defaultValues: { ...DEFAULT_FILTERS },
  })
  const values =
    useWatch({ control, defaultValue: DEFAULT_FILTERS }) ?? DEFAULT_FILTERS
  const filtersKey = JSON.stringify(values)
  const debouncedKey = useDebounce(filtersKey, 400)
  const filters = useMemo(() => JSON.parse(debouncedKey), [debouncedKey])

  const {
    launches,
    totalCount,
    agencyOptions,
    loading,
    error,
    retry,
  } = useLaunches(filters)
  const { sortedLaunches, sortKey, sortDirection, toggleSort } =
    useSortedLaunches(launches)

  const nearest = getNearestLaunch(launches)
  const isEmpty = !loading && !error && launches.length === 0
  const isInitialLoading = loading && launches.length === 0
  const isRefreshing = loading && launches.length > 0

  function handleReset() {
    reset({ ...DEFAULT_FILTERS })
  }

  return (
    <>
      <FiltersForm
        control={control}
        agencyOptions={agencyOptions}
        onReset={handleReset}
        isRefreshing={isRefreshing}
      />

      <KpiRow
        nearest={nearest}
        totalCount={totalCount}
        isLoading={isInitialLoading}
        hasError={Boolean(error)}
      />

      <section className="card">
        <h3 className="card__title">Місії</h3>

        {isInitialLoading && <QueryState variant="loading" />}

        {!loading && error && (
          <QueryState variant="error" message={error} onRetry={retry} />
        )}

        {isEmpty && <QueryState variant="empty" />}

        {!error && launches.length > 0 && (
          <MissionsTable
            launches={sortedLaunches}
            totalCount={totalCount}
            sortKey={sortKey}
            sortDirection={sortDirection}
            onSort={toggleSort}
          />
        )}
      </section>
    </>
  )
}
