/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/LICENSE.md
 */

import React from "react"
import StackedBarChart, {
  DisplayStyle,
} from "Renderer/components/core/stacked-bar-chart/stacked-bar-chart.component"
import { DiskSpaceCategory } from "Renderer/models/files-manager/files-manager.interface"
import FilesSummary from "Renderer/modules/filesManager/components/files-summary.component"
import { FunctionComponent } from "Renderer/types/function-component.interface"

export interface MemoryChartProps {
  memoryChartData: DiskSpaceCategory[]
}

const memoryToStackedBarChartData = (data: DiskSpaceCategory[]) => {
  return data.map((el) => {
    const { occupiedMemory, color, free } = el
    return {
      value: occupiedMemory,
      color,
      free,
    }
  })
}

const MemoryChart: FunctionComponent<MemoryChartProps> = ({
  memoryChartData,
}) => {
  return (
    <>
      <StackedBarChart
        displayStyle={DisplayStyle.Thick}
        chartData={memoryToStackedBarChartData(memoryChartData)}
        labels
      />
      <FilesSummary memoryChartData={memoryChartData} />
    </>
  )
}

export default MemoryChart
