import Counter from './components/Counter.jsx'
import Toggle from './components/Toggle.jsx'
import Dashboard from './containers/Dashboard.jsx'

export default function App() {
  return (
    <div className="app">
      <header className="header">
        <h1>🚀 Космічні запуски</h1>
      </header>

      <Dashboard />

      <div className="widgets-row">
        <Counter />
        <Toggle altitudeKm={408} />
      </div>
    </div>
  )
}
