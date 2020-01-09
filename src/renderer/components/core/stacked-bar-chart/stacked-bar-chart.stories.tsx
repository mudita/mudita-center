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
      { value: 100, color: "red", filesType: "Music" },
      { value: 1000, color: "orange", filesType: "Music" },
      { value: 1000, color: "yellow", filesType: "Music" },
      { value: 100, color: "green", filesType: "Music" },
      { value: 100, color: "blue", filesType: "Music" },
      { value: 100, color: "pink", filesType: "Free" },
    ])
    const maxLabel = text("Label", "16 GB")
    return (
      <Container>
        <StackedBarChart
          chartData={chartData}
          maxLabel={maxLabel}
          displayStyle={DisplayStyle.MultiColor}
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
      { value: 1000, color: "pink", filesType: "Free" },
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
