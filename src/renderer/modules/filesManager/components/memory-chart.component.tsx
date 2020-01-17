import React from "react"
import StackedBarChart, {
  DisplayStyle,
} from "Renderer/components/core/stacked-bar-chart/stacked-bar-chart.component"
import { DiskSpaceCategory } from "Renderer/models/files-manager/files-manager.interface"
import FilesSummary from "Renderer/modules/filesManager/components/files-summary.component"
import FunctionComponent from "Renderer/types/function-component.interface"

interface Props {
  memoryChartData: DiskSpaceCategory[]
}

const memorytoStackedBarChartData = (data: DiskSpaceCategory[]) => {
  return data.map(el => {
    const { icon, filesAmount, occupiedMemory, ...rest } = el
    return {
      value: occupiedMemory,
      ...rest,
    }
  })
}

const MemoryChart: FunctionComponent<Props> = ({ memoryChartData }) => {
  return (
    <>
      <StackedBarChart
        displayStyle={DisplayStyle.MultiColor}
        chartData={memorytoStackedBarChartData(memoryChartData)}
        showStats
      />
      <FilesSummary memoryChartData={memoryChartData} />
    </>
  )
}

export default MemoryChart
