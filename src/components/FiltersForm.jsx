import { Controller } from 'react-hook-form'
import { STATUS_OPTIONS } from '../constants/launchFilters.js'

export default function FiltersForm({
  control,
  agencyOptions,
  onReset,
  isRefreshing,
}) {
  return (
    <section className="card filters">
      <div className="filters__head">
        <h3 className="card__title">Фільтри</h3>

        <div className="filters__actions">
          {isRefreshing && <span className="filters__status">Оновлення…</span>}

          <button type="button" className="btn btn--ghost" onClick={onReset}>
            Скинути
          </button>
        </div>
      </div>

      <form
        className="filters__grid"
        onSubmit={(event) => event.preventDefault()}
      >
        <label className="field">
          <span className="field__label">Пошук</span>
          <Controller
            name="search"
            control={control}
            render={({ field }) => (
              <input
                {...field}
                type="search"
                placeholder="Назва місії, ракети, агенції"
              />
            )}
          />
        </label>

        <label className="field">
          <span className="field__label">Агенція</span>
          <Controller
            name="agency"
            control={control}
            render={({ field }) => (
              <select {...field}>
                <option value="">Усі агенції</option>

                {agencyOptions.map((agency) => (
                  <option key={agency} value={agency}>
                    {agency}
                  </option>
                ))}
              </select>
            )}
          />
        </label>

        <label className="field">
          <span className="field__label">Статус</span>
          <Controller
            name="status"
            control={control}
            render={({ field }) => (
              <select {...field}>
                <option value="">Усі статуси</option>

                {STATUS_OPTIONS.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
            )}
          />
        </label>

        <label className="field">
          <span className="field__label">Дата від</span>
          <Controller
            name="dateFrom"
            control={control}
            render={({ field }) => <input {...field} type="date" />}
          />
        </label>

        <label className="field">
          <span className="field__label">Дата до</span>
          <Controller
            name="dateTo"
            control={control}
            render={({ field }) => <input {...field} type="date" />}
          />
        </label>
      </form>
    </section>
  )
}
