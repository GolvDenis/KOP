import { useState } from 'react'

const KM_TO_MI = 0.621371

export default function Toggle({ altitudeKm = 408 }) {
  const [unit, setUnit] = useState('km')

  const isKm = unit === 'km'
  const value = isKm ? altitudeKm : (altitudeKm * KM_TO_MI).toFixed(1)

  return (
    <section className="card">
      <h3 className="card__title">Одиниці виміру</h3>

      <div className="segmented">
        <button
          type="button"
          className={`seg ${isKm ? 'seg--active' : ''}`}
          onClick={() => setUnit('km')}
        >
          км
        </button>
        <button
          type="button"
          className={`seg ${isKm ? '' : 'seg--active'}`}
          onClick={() => setUnit('mi')}
        >
          милі
        </button>
      </div>

      <p className="toggle__value">
        Висота орбіти МКС: {value} {isKm ? 'км' : 'милі'}
      </p>
    </section>
  )
}
