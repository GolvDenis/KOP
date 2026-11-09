export default function QueryState({ variant, message, onRetry }) {
  if (variant === 'loading') {
    return (
      <div className="state" role="status">
        <span className="spinner" aria-hidden="true" />
        <p>Завантаження місій…</p>
      </div>
    )
  }

  if (variant === 'error') {
    return (
      <div className="state state--error" role="alert">
        <p>{message ?? 'Не вдалося завантажити дані.'}</p>
        <button type="button" className="btn btn--ghost" onClick={onRetry}>
          Спробувати ще раз
        </button>
      </div>
    )
  }

  return <p className="state">Місій не знайдено.</p>
}
