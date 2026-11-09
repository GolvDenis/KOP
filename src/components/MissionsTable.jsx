import { formatLaunchDate } from '../utils/launches.js'

const COLUMNS = [
  { key: 'name', label: 'Місія', sortable: true },
  { key: 'agency', label: 'Агенція', sortable: true },
  { key: 'rocket', label: 'Ракета', sortable: false },
  { key: 'pad', label: 'Майданчик', sortable: false },
  { key: 'status', label: 'Статус', sortable: false },
  { key: 'net', label: 'Дата (NET)', sortable: true },
]

const STATUS_TONES = {
  Go: 'go',
  Success: 'success',
  TBD: 'tbd',
  Hold: 'hold',
  Failure: 'failure',
  'Partial Failure': 'partial',
  'In Flight': 'flight',
}

function getAriaSort(columnKey, sortKey, sortDirection) {
  if (columnKey !== sortKey) return 'none'
  return sortDirection === 'asc' ? 'ascending' : 'descending'
}

export default function MissionsTable({
  launches,
  totalCount,
  sortKey,
  sortDirection,
  onSort,
}) {
  return (
    <div className="table-wrap">
      <p className="table-meta">
        {totalCount > launches.length
          ? `Показано ${launches.length} із ${totalCount}`
          : `Усього: ${totalCount}`}
      </p>

      <table className="missions-table">
        <thead>
          <tr>
            {COLUMNS.map((column) => (
              <th
                key={column.key}
                aria-sort={getAriaSort(column.key, sortKey, sortDirection)}
              >
                {column.sortable ? (
                  <button
                    type="button"
                    className="sort-btn"
                    onClick={() => onSort(column.key)}
                  >
                    {column.label}
                    {column.key === sortKey && (
                      <span aria-hidden="true">
                        {sortDirection === 'asc' ? ' ▲' : ' ▼'}
                      </span>
                    )}
                  </button>
                ) : (
                  column.label
                )}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {launches.map((launch) => (
            <tr key={launch.id}>
              <td>{launch.name}</td>
              <td>{launch.agency}</td>
              <td>{launch.rocket}</td>
              <td>{launch.pad}</td>
              <td>
                <span
                  className={`badge badge--${STATUS_TONES[launch.status] ?? 'default'}`}
                >
                  {launch.status}
                </span>
              </td>
              <td>{formatLaunchDate(launch.net)}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
