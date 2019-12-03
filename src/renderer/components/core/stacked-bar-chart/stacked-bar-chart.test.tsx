import "@testing-library/jest-dom/extend-expect"
import "jest-styled-components"
import React from "react"
import StackedBarChart, {
  DisplayStyle,
} from "Renderer/components/core/stacked-bar-chart/stacked-bar-chart.component"
import { renderWithThemeAndIntl } from "Renderer/utils/render-with-theme-and-intl"

const barId = "bar"
const barWithLabelId = "bar-with-label"
const chartData = [
  { value: 100, color: "red" },
  { value: 1000, color: "orange" },
  { value: 1000, color: "yellow" },
  { value: 100, color: "green" },
  { value: 100, color: "blue" },
  { value: 100, color: "pink" },
]
const maxLabel = "16 GB"
const occupiedSpaceLabel = "12.2 GB"
const occupiedSpaceInPercent = "( 77%)"

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
        maxLabel={maxLabel}
        displayStyle={DisplayStyle.MultiColor}
        occupiedSpaceLabel={occupiedSpaceLabel}
        occupiedSpaceInPercent={occupiedSpaceInPercent}
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

  test("label when provided should render", () => {
    const { getByText } = renderWithThemeAndIntl(
      <StackedBarChart
        chartData={chartData}
        maxLabel={maxLabel}
        displayStyle={DisplayStyle.MultiColor}
        occupiedSpaceLabel={occupiedSpaceLabel}
        occupiedSpaceInPercent={occupiedSpaceInPercent}
      />
    )
    expect(getByText(occupiedSpaceLabel)).toBeInTheDocument()
    expect(getByText(occupiedSpaceLabel)).toHaveTextContent(
      `${occupiedSpaceLabel}( ${occupiedSpaceInPercent})`
    )
  })

  test("number of elements rendered without label should equal to number of all elements - 1 (with label)", () => {
    const { getAllByTestId } = renderWithThemeAndIntl(
      <StackedBarChart
        chartData={chartData}
        maxLabel={maxLabel}
        displayStyle={DisplayStyle.MultiColor}
        occupiedSpaceLabel={occupiedSpaceLabel}
        occupiedSpaceInPercent={occupiedSpaceInPercent}
      />
    )
    expect(getAllByTestId(barId).length).toEqual(chartData.length - 1)
  })
})
