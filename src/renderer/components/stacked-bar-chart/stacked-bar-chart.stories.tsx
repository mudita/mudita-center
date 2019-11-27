import { number, object, text, withKnobs } from "@storybook/addon-knobs"
import { storiesOf } from "@storybook/react"
import * as React from "react"
import StackedBarChart from "Renderer/components/stacked-bar-chart/stacked-bar-chart.component"
import styled from "styled-components"

const Container = styled.div`
  margin: 100px 0;
`

storiesOf("Components|StackedBarChart", module)
  .addDecorator(withKnobs)
  .add("InitialState", () => {
    const chartData = object("Chart Data", [
      { value: 100, color: "red" },
      { value: 1000, color: "orange" },
      { value: 1000, color: "yellow" },
      { value: 100, color: "green" },
      { value: 100, color: "blue" },
      { value: 100, color: "pink" },
    ])

    const barHeight = number("Bar Height", 10)
    const maxLabel = text("Label", "16 GB")
    return (
      <Container>
        <StackedBarChart
          chartData={chartData}
          maxLabel={maxLabel}
          barHeight={barHeight}
          occupiedSpaceLabel="12.2 GB"
          occupiedSpaceInPercent="( 77%)"
        />
      </Container>
    )
  })
