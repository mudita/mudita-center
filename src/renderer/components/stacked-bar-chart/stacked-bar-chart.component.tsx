import * as React from "react"
import FunctionComponent from "Renderer/types/function-component.interface"
import styled from "styled-components"

const Progress = styled.div`
  display: flex;
  background-color: grey;
  width: 100%;
  height: 10px;
`

const Bar = styled.div<{ color: string; percentage: number }>`
  width: ${({ percentage }) => percentage}%;
  height: 10px;
  background-color: ${({ color }) => color};
`

interface Props {
  chartData: Array<{ value: number; color: string }>
  maxLabel: string
}

const StackedBarChart: FunctionComponent<Props> = ({ chartData, maxLabel }) => {
  const max = chartData.reduce((acc, { value }) => acc + value, 0)
  const label = maxLabel.replace("%s", String(max))
  const barData = chartData.map(obj => ({
    ...obj,
    percentage: (obj.value / max) * 100,
  }))
  console.log(barData)
  return (
    <Progress>
      {barData.map(bar => (
        <Bar color={bar.color} percentage={bar.percentage} key={bar.color} />
      ))}
    </Progress>
  )
}

export default StackedBarChart
