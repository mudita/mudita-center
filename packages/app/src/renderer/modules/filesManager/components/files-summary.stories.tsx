import { storiesOf } from "@storybook/react"
import * as React from "react"
import { Router } from "react-router"
import { fakeMemoryChartData } from "Renderer/modules/filesManager/components/fake-data"
import FilesSummary from "Renderer/modules/filesManager/components/files-summary.component"
import history from "Renderer/routes/history"
import styled from "styled-components"

const Container = styled.div`
  width: 98.5rem;
`

storiesOf("Components/Files Summary", module).add("FilesSummary", () => {
  return (
    <Router history={history}>
      <Container>
        <FilesSummary memoryChartData={fakeMemoryChartData} />
      </Container>
    </Router>
  )
})
