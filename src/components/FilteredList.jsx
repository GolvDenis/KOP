import { useState } from 'react'

const ALL = 'Усі'

const AGENCY_COLORS = {
  SpaceX: '#4f8cff',
  NASA: '#ff6b6b',
  Roscosmos: '#f6c85f',
  ISRO: '#3ddc97',
  ESA: '#b98cff',
}

const FALLBACK_COLOR = '#8b93ad'

export default function FilteredList({ missions }) {
  const [agency, setAgency] = useState(ALL)

  const agencies = [ALL, ...new Set(missions.map((mission) => mission.agency))]

  const visible =
    agency === ALL
      ? missions
      : missions.filter((mission) => mission.agency === agency)

  return (
    <section className="card">
      <h3 className="card__title">Місії</h3>

      <label className="field__label" htmlFor="agency">
        Агенція
      </label>
      <select
        id="agency"
        className="field__select"
        value={agency}
        onChange={(event) => setAgency(event.target.value)}
      >
        {agencies.map((name) => (
          <option key={name} value={name}>
            {name}
          </option>
        ))}
      </select>

      <p className="list__count">
        Показано: {visible.length} з {missions.length}
      </p>

      {visible.length === 0 ? (
        <p className="list__empty">Місій не знайдено</p>
      ) : (
        <ul className="list">
          {visible.map((mission) => {
            const color = AGENCY_COLORS[mission.agency] ?? FALLBACK_COLOR

            return (
              <li className="list__item" key={mission.id}>
                <span className="list__name">{mission.name}</span>
                <span
                  className="badge"
                  style={{ color, borderColor: color }}
                >
                  {mission.agency}
                </span>
              </li>
            )
          })}
        </ul>
      )}
    </section>
  )
}
