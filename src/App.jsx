import Counter from './components/Counter.jsx'
import FilteredList from './components/FilteredList.jsx'
import KpiCard from './components/KpiCard.jsx'
import Toggle from './components/Toggle.jsx'
import { kpiData, missions } from './data/mockData.js'

export default function App() {
  return (
    <div className="app">
      <header className="header">
        <h1>🚀 Космічні запуски</h1>
      </header>

      <div className="kpi-row">
        {kpiData.map((item) => (
          <KpiCard
            key={item.id}
            title={item.title}
            value={item.value}
            change={item.change}
            trend={item.trend}
          />
        ))}
      </div>

      <div className="grid">
        <div className="grid__col">
          <Counter />
          <Toggle altitudeKm={408} />
        </div>
        <div className="grid__col grid__col--wide">
          <FilteredList missions={missions} />
        </div>
      </div>
    </div>
  )
}
