import React from "react"
import StackedBarChart, {
  ChartItem,
  DisplayStyle,
} from "Renderer/components/core/stacked-bar-chart/stacked-bar-chart.component"
import { FilesManagerData } from "Renderer/models/files-manager/files-manager.interface"
import FilesManagerBox from "Renderer/modules/filesManager/components/files-manager-box.component"
import FunctionComponent from "Renderer/types/function-component.interface"
import styled from "styled-components"

interface Props {
  stackedBarChartData: ChartItem[]
  memoryChartData: FilesManagerData[]
}

const FilesManagerWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 0 2rem;
`

const MemoryChart: FunctionComponent<Props> = ({
  stackedBarChartData,
  memoryChartData,
}) => {
  console.log(memoryChartData)
  return (
    <>
      <StackedBarChart
        displayStyle={DisplayStyle.MultiColor}
        chartData={stackedBarChartData}
        maxLabel={"16gb"}
      />
      <FilesManagerWrapper>
        {memoryChartData.map((box, index: number) => (
          <FilesManagerBox {...box} key={index} />
        ))}
      </FilesManagerWrapper>
    </>
  )
}

export default MemoryChart
