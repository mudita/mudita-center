import { storiesOf } from "@storybook/react"
import * as React from "react"
import StackedBarChart from "Renderer/components/stacked-bar-chart/stacked-bar-chart.component"
import styled from "styled-components"

const Container = styled.div`
  width: 500px;
`

storiesOf("Components|StackedBarChart", module).add("InitialState", () => {
  const chartData = [
    { value: 234932942, color: "red" },
    { value: 234932942, color: "orange" },
    { value: 234932942, color: "yellow" },
    { value: 234932942, color: "green" },
    { value: 234932942, color: "blue" },
    { value: 234932942, color: "pink" },
  ]
  const max = "GB"
  return (
    <Container>
      <StackedBarChart chartData={chartData} maxLabel={max} />
    </Container>
  )
})
