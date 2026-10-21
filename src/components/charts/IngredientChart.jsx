import {
  Bar,
  BarChart,
  CartesianGrid,
  ReferenceLine,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts'
import ChartTooltip from './ChartTooltip.jsx'
import { getIngredients } from '../../utils/meals.js'

function IngredientChart({ meals }) {
  const ingredientCounts = meals.map((meal) => getIngredients(meal).length)
  const min = Math.min(...ingredientCounts)
  const max = Math.max(...ingredientCounts)

  const data = []
  for (let n = min; n <= max; n++) {
    data.push({
      ingredients: n,
      meals: ingredientCounts.filter((count) => count === n).length,
    })
  }

  const average =
    ingredientCounts.reduce((sum, count) => sum + count, 0) / ingredientCounts.length
  const peak = data.reduce((best, item) => (item.meals > best.meals ? item : best), data[0])

  return (
    <section className="chart-card">
      <div className="chart-card-top">
        <div>
          <h2>How many ingredients?</h2>
          <p className="chart-subtitle">Number of meals by ingredient count</p>
        </div>
      </div>

      <div className="chart-body">
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={data} margin={{ top: 24, right: 8, bottom: 20, left: -12 }}>
            <CartesianGrid vertical={false} stroke="var(--border)" />
            <XAxis
              dataKey="ingredients"
              tickLine={false}
              axisLine={{ stroke: 'var(--border)' }}
              tick={{ fill: 'var(--muted)', fontSize: 12 }}
              interval="preserveStartEnd"
              label={{
                value: 'Ingredients in the recipe',
                position: 'insideBottom',
                offset: -12,
                fill: 'var(--muted)',
                fontSize: 12,
              }}
            />
            <YAxis
              allowDecimals={false}
              tickLine={false}
              axisLine={false}
              tick={{ fill: 'var(--muted)', fontSize: 12 }}
            />
            <Tooltip
              cursor={{ fill: 'var(--accent-soft)' }}
              content={
                <ChartTooltip
                  formatLabel={(d) => (
                    <>
                      <strong>
                        {d.ingredients} {d.ingredients === 1 ? 'ingredient' : 'ingredients'}
                      </strong>
                      <span>
                        {d.meals} {d.meals === 1 ? 'meal' : 'meals'}
                      </span>
                    </>
                  )}
                />
              }
            />
            <Bar
              dataKey="meals"
              fill="var(--accent)"
              maxBarSize={24}
              radius={[4, 4, 0, 0]}
              isAnimationActive={false}
            />
            <ReferenceLine
              x={Math.round(average)}
              stroke="var(--text)"
              strokeDasharray="4 4"
              label={{
                value: `avg ${average.toFixed(1)}`,
                position: 'top',
                fill: 'var(--text)',
                fontSize: 12,
                fontWeight: 600,
              }}
            />
          </BarChart>
        </ResponsiveContainer>
      </div>

      <p className="chart-note">
        Recipes range from <strong>{min}</strong> to <strong>{max}</strong> ingredients.
        The most common count is <strong>{peak.ingredients}</strong> ({peak.meals}{' '}
        {peak.meals === 1 ? 'meal' : 'meals'}).
      </p>
    </section>
  )
}

export default IngredientChart
