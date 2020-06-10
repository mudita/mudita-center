import "@testing-library/jest-dom"
import React from "react"
import StackedBarChart, {
  DisplayStyle,
} from "Renderer/components/core/stacked-bar-chart/stacked-bar-chart.component"
import { renderWithThemeAndIntl } from "Renderer/utils/render-with-theme-and-intl"

const barId = "bar"
const barWithLabelId = "bar-with-label"

const chartData = [
  { value: 4294967296, color: "red" },
  { value: 4294967296, color: "orange" },
  { value: 4294967296, color: "yellow" },
  { value: 4294967296, color: "green" },
]
const occupiedSpaceId = "occupied-space"

describe("Snapshot tests", () => {
  test("should match snapshot simple", () => {
    const { container } = renderWithThemeAndIntl(
      <StackedBarChart
        chartData={chartData}
        displayStyle={DisplayStyle.Simple}
      />
    )
    expect(container.firstChild).toMatchSnapshot()
  })

  test("should match snapshot multicolor", () => {
    const { container } = renderWithThemeAndIntl(
      <StackedBarChart
        chartData={chartData}
        displayStyle={DisplayStyle.MultiColor}
      />
    )
    expect(container.firstChild).toMatchSnapshot()
  })
})

describe("Correct rendering of chart elements and label", () => {
  test("without labels provided, bar with label should not be rendered", () => {
    const { queryByTestId } = renderWithThemeAndIntl(
      <StackedBarChart
        chartData={chartData}
        displayStyle={DisplayStyle.Simple}
      />
    )
    expect(queryByTestId(barWithLabelId)).toBeNull()
  })

  test("label should render", () => {
    const { getByTestId } = renderWithThemeAndIntl(
      <StackedBarChart
        chartData={chartData}
        displayStyle={DisplayStyle.MultiColor}
        showStats
      />
    )
    expect(getByTestId(occupiedSpaceId)).toBeInTheDocument()
    expect(getByTestId(occupiedSpaceId)).toHaveTextContent(`16 GB( 100%)`)
  })

  test("number of elements rendered without label should equal to number of all elements - 1 (with label)", () => {
    const { getAllByTestId } = renderWithThemeAndIntl(
      <StackedBarChart
        chartData={chartData}
        displayStyle={DisplayStyle.MultiColor}
        showStats
      />
    )
    expect(getAllByTestId(barId).length).toEqual(chartData.length - 1)
  })
})
