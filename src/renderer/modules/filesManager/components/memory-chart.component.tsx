import React from "react"
import StackedBarChart, {
  ChartItem,
  DisplayStyle,
} from "Renderer/components/core/stacked-bar-chart/stacked-bar-chart.component"
import FunctionComponent from "Renderer/types/function-component.interface"

interface Props {
  stackedBarChartData: ChartItem[]
}

const MemoryChart: FunctionComponent<Props> = ({ stackedBarChartData }) => {
  console.log(stackedBarChartData)
  return (
    <StackedBarChart
      displayStyle={DisplayStyle.MultiColor}
      chartData={stackedBarChartData}
      maxLabel={"16gb"}
    />
  )
}

export default MemoryChart
