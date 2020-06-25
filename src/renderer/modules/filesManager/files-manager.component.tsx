import React from "react"
import Text, {
  TextDisplayStyle,
} from "Renderer/components/core/text/text.component"
import MemoryChartContainer from "Renderer/modules/filesManager/components/memory-chart.container"
import { backgroundColor } from "Renderer/styles/theming/theme-getters"
import FunctionComponent from "Renderer/types/function-component.interface"
import styled from "styled-components"

const FilesManagerWrapper = styled.div`
  padding: 3.2rem 3rem 4.8rem 4rem;
  background-color: ${backgroundColor("minor")};
`

const FilesManagerHeading = styled(Text)`
  margin-bottom: 4.7rem;
`

const FilesManager: FunctionComponent = () => {
  return (
    <FilesManagerWrapper>
      <FilesManagerHeading displayStyle={TextDisplayStyle.TertiaryHeading}>
        All files summary
      </FilesManagerHeading>
      <MemoryChartContainer />
    </FilesManagerWrapper>
  )
}

export default FilesManager
