import React from "react"
import StackedBarChart, {
  ChartItem,
  DisplayStyle,
} from "Renderer/components/core/stacked-bar-chart/stacked-bar-chart.component"
import { FilesManagerData } from "Renderer/models/files-manager/files-manager.interface"
import FilesSummary from "Renderer/modules/filesManager/components/files-summary.component"
import FunctionComponent from "Renderer/types/function-component.interface"

interface Props {
  stackedBarChartData: ChartItem[]
  memoryChartData: FilesManagerData[]
}

const MemoryChart: FunctionComponent<Props> = ({
  stackedBarChartData,
  memoryChartData,
}) => {
  return (
    <>
      <StackedBarChart
        displayStyle={DisplayStyle.MultiColor}
        chartData={stackedBarChartData}
        showStats
      />
      <FilesSummary memoryChartData={memoryChartData} />
    </>
  )
}

export default MemoryChart
