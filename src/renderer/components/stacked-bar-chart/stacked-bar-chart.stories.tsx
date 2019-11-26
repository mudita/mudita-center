import { storiesOf } from "@storybook/react"
import * as React from "react"
import StackedBarChart from "Renderer/components/stacked-bar-chart/stacked-bar-chart.component"

storiesOf("Components|StackedBarChart", module).add("InitialState", () => {
  const chartData = [
    { value: 10, color: "red" },
    { value: 10, color: "orange" },
    { value: 10, color: "yellow" },
    { value: 10, color: "green" },
    { value: 10, color: "blue" },
    { value: 10, color: "pink" },
  ]
  const max = "16 GB"
  return <StackedBarChart chartData={chartData} maxLabel={max} />
})
