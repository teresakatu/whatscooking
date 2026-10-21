function ChartTooltip({ active, payload, formatLabel }) {
  if (!active || !payload?.length) {
    return null
  }

  const { payload: datum } = payload[0]

  return <div className="chart-tooltip">{formatLabel(datum)}</div>
}

export default ChartTooltip
