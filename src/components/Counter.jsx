import { useState } from 'react'

export default function Counter() {
  const [count, setCount] = useState(0)

  return (
    <section className="card">
      <h3 className="card__title">Обрані місії</h3>

      <p className="counter__value">{count}</p>

      <div className="counter__buttons">
        <button
          type="button"
          className="btn btn--accent"
          onClick={() => setCount((prev) => prev - 1)}
          disabled={count === 0}
        >
          −
        </button>
        <button
          type="button"
          className="btn btn--accent"
          onClick={() => setCount((prev) => prev + 1)}
        >
          +
        </button>
        <button
          type="button"
          className="btn btn--ghost"
          onClick={() => setCount(0)}
        >
          Скинути
        </button>
      </div>
    </section>
  )
}
