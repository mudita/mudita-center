import React from "react"
import StackedBarChart, {
  ChartItem,
  DisplayStyle,
} from "Renderer/components/core/stacked-bar-chart/stacked-bar-chart.component"
import FunctionComponent from "Renderer/types/function-component.interface"

interface Props {
  data: ChartItem[]
}

const MemoryChart: FunctionComponent<Props> = ({ data }) => {
  console.log(data)
  return (
    <StackedBarChart displayStyle={DisplayStyle.MultiColor} chartData={data} />
  )
}

export default MemoryChart
