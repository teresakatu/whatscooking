import { useState } from 'react'
import {
  Bar,
  BarChart,
  Cell,
  LabelList,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts'
import ChartTooltip from './ChartTooltip.jsx'
import { countBy } from '../../utils/meals.js'

const MAX_BARS = 8

const VIEWS = {
  area: { key: 'strArea', label: 'Cuisine', plural: 'cuisines' },
  category: { key: 'strCategory', label: 'Category', plural: 'categories' },
}

function BreakdownChart({ meals }) {
  const [view, setView] = useState('area')
  const { key, plural } = VIEWS[view]

  const counts = countBy(meals, key)
  const data = counts.slice(0, MAX_BARS)
  const rest = counts.slice(MAX_BARS)
  if (rest.length > 0) {
    data.push({
      name: `${rest.length} other ${rest.length === 1 ? plural.slice(0, -1) : plural}`,
      count: rest.reduce((sum, item) => sum + item.count, 0),
      isOther: true,
    })
  }

  const leader = counts[0]
  const leaderShare = leader ? Math.round((leader.count / meals.length) * 100) : 0

  return (
    <section className="chart-card">
      <div className="chart-card-top">
        <div>
          <h2>Where the meals come from</h2>
          <p className="chart-subtitle">Number of meals per {VIEWS[view].label.toLowerCase()}</p>
        </div>

        <div className="toggle" role="group" aria-label="Group meals by">
          {Object.entries(VIEWS).map(([value, option]) => (
            <button
              key={value}
              type="button"
              className="toggle-option"
              aria-pressed={view === value}
              onClick={() => setView(value)}
            >
              {option.label}
            </button>
          ))}
        </div>
      </div>

      <div className="chart-body">
        <ResponsiveContainer width="100%" height={data.length * 34 + 16}>
          <BarChart
            data={data}
            layout="vertical"
            margin={{ top: 4, right: 40, bottom: 4, left: 0 }}
          >
            <XAxis type="number" hide allowDecimals={false} />
            <YAxis
              type="category"
              dataKey="name"
              width={120}
              tickLine={false}
              axisLine={false}
              tick={{ fill: 'var(--muted)', fontSize: 13 }}
            />
            <Tooltip
              cursor={{ fill: 'var(--accent-soft)' }}
              content={
                <ChartTooltip
                  formatLabel={(d) => (
                    <>
                      <strong>{d.name}</strong>
                      <span>
                        {d.count} {d.count === 1 ? 'meal' : 'meals'}
                      </span>
                    </>
                  )}
                />
              }
            />
            <Bar dataKey="count" barSize={18} radius={[0, 4, 4, 0]} isAnimationActive={false}>
              {data.map((item) => (
                <Cell
                  key={item.name}
                  fill={item.isOther ? 'var(--chart-muted)' : 'var(--accent)'}
                />
              ))}
              <LabelList
                dataKey="count"
                position="right"
                fill="var(--text)"
                fontSize={13}
                fontWeight={600}
              />
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>

      {leader && (
        <p className="chart-note">
          <strong>{leader.name}</strong> leads with {leaderShare}% of the meals shown
          {counts.length > 1 && <>, across {counts.length} {plural} in total</>}.
        </p>
      )}
    </section>
  )
}

export default BreakdownChart
