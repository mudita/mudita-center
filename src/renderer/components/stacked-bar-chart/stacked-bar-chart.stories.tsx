import { number, object, text, withKnobs } from "@storybook/addon-knobs"
import { storiesOf } from "@storybook/react"
import * as React from "react"
import StackedBarChart from "Renderer/components/stacked-bar-chart/stacked-bar-chart.component"

storiesOf("Components|StackedBarChart", module)
  .addDecorator(withKnobs)
  .add("InitialState", () => {
    const chartData = object("Chart Data", [
      { value: 100, color: "red" },
      { value: 1000, color: "orange" },
      { value: 1000, color: "yellow" },
      { value: 100, color: "green" },
      { value: 10, color: "blue" },
      { value: 10, color: "pink" },
    ])

    const barHeight = number("Bar Height", 10)
    const maxLabel = text("Label", "16 GB")
    return (
      <StackedBarChart
        chartData={chartData}
        maxLabel={maxLabel}
        barHeight={barHeight}
      />
    )
  })
