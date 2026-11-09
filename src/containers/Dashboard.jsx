import KpiRow from '../components/KpiRow.jsx'
import MissionsTable from '../components/MissionsTable.jsx'
import QueryState from '../components/QueryState.jsx'
import { useLaunches } from '../hooks/useLaunches.js'
import { useSortedLaunches } from '../hooks/useSortedLaunches.js'
import { getNearestLaunch } from '../utils/launches.js'

export default function Dashboard() {
  const { launches, launchesThisYear, isLoading, error, retry } = useLaunches()
  const { sortedLaunches, sortKey, sortDirection, toggleSort } =
    useSortedLaunches(launches)

  const nearest = getNearestLaunch(launches)
  const isEmpty = !isLoading && !error && sortedLaunches.length === 0

  return (
    <>
      <KpiRow
        nearest={nearest}
        launchesThisYear={launchesThisYear}
        isLoading={isLoading}
        hasError={Boolean(error)}
      />

      <section className="card">
        <h3 className="card__title">Місії</h3>

        {isLoading && <QueryState variant="loading" />}

        {!isLoading && error && (
          <QueryState variant="error" message={error} onRetry={retry} />
        )}

        {isEmpty && <QueryState variant="empty" />}

        {!isLoading && !error && !isEmpty && (
          <MissionsTable
            launches={sortedLaunches}
            sortKey={sortKey}
            sortDirection={sortDirection}
            onSort={toggleSort}
          />
        )}
      </section>
    </>
  )
}
