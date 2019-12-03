import { object, text, withKnobs } from "@storybook/addon-knobs"
import { storiesOf } from "@storybook/react"
import * as React from "react"
import StackedBarChart, {
  DisplayStyle,
} from "Renderer/components/core/stacked-bar-chart/stacked-bar-chart.component"
import styled from "styled-components"

const Container = styled.div`
  padding: 10rem;
`

storiesOf("Components|StackedBarChart", module)
  .addDecorator(withKnobs)
  .add("MultiColor", () => {
    const chartData = object("Chart Data", [
      { value: 100, color: "red" },
      { value: 1000, color: "orange" },
      { value: 1000, color: "yellow" },
      { value: 100, color: "green" },
      { value: 100, color: "blue" },
      { value: 100, color: "pink" },
    ])
    const maxLabel = text("Label", "16 GB")
    return (
      <Container>
        <StackedBarChart
          chartData={chartData}
          maxLabel={maxLabel}
          displayStyle={DisplayStyle.MultiColor}
          occupiedSpaceLabel="12.2 GB"
          occupiedSpaceInPercent="77%"
        />
      </Container>
    )
  })
  .add("Simple", () => {
    const chartData = object("Chart Data", [
      { value: 100, color: "red" },
      { value: 1000, color: "red" },
      { value: 1000, color: "red" },
      { value: 100, color: "red" },
      { value: 100, color: "red" },
      { value: 1000, color: "pink" },
    ])
    return (
      <Container>
        <StackedBarChart
          chartData={chartData}
          displayStyle={DisplayStyle.Simple}
        />
      </Container>
    )
  })
