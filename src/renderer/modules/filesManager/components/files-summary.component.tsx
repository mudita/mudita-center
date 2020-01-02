import React from "react"
import { FilesManagerData } from "Renderer/models/files-manager/files-manager.interface"
import FilesSummaryBox from "Renderer/modules/filesManager/components/files-summary-box.component"
import FunctionComponent from "Renderer/types/function-component.interface"
import styled from "styled-components"

const FilesSummaryWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 0 2rem;
`

interface Props {
  memoryChartData: FilesManagerData[]
}

const FilesSummary: FunctionComponent<Props> = ({ memoryChartData }) => {
  return (
    <FilesSummaryWrapper>
      {memoryChartData.map((box, index: number) => (
        <FilesSummaryBox {...box} key={index} />
      ))}
    </FilesSummaryWrapper>
  )
}

export default FilesSummary
