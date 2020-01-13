import React from "react"
import { DiskSpaceCategory } from "Renderer/models/files-manager/files-manager.interface"
import FilesSummaryItem from "Renderer/modules/filesManager/components/files-summary-item.component"
import FunctionComponent from "Renderer/types/function-component.interface"
import styled from "styled-components"

const FilesSummaryWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  margin-top: 2.4rem;
`

interface Props {
  memoryChartData: DiskSpaceCategory[]
}

const FilesSummary: FunctionComponent<Props> = ({ memoryChartData }) => {
  return (
    <FilesSummaryWrapper>
      {memoryChartData.map((box, index: number) => (
        <FilesSummaryItem {...box} key={index} />
      ))}
    </FilesSummaryWrapper>
  )
}

export default FilesSummary
