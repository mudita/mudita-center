/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import React from "react"
import StackedBarChart, {
  DisplayStyle,
} from "App/__deprecated__/renderer/components/core/stacked-bar-chart/stacked-bar-chart.component"
import { renderWithThemeAndIntl } from "App/__deprecated__/renderer/utils/render-with-theme-and-intl"

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
      <StackedBarChart chartData={chartData} displayStyle={DisplayStyle.Thin} />
    )
    expect(container.firstChild).toMatchSnapshot()
  })

  test("should match snapshot multicolor", () => {
    const { container } = renderWithThemeAndIntl(
      <StackedBarChart
        chartData={chartData}
        displayStyle={DisplayStyle.Thick}
      />
    )
    expect(container.firstChild).toMatchSnapshot()
  })
})

describe("Correct rendering of chart elements and label", () => {
  test("without labels provided, bar with label should not be rendered", () => {
    const { queryByTestId } = renderWithThemeAndIntl(
      <StackedBarChart chartData={chartData} displayStyle={DisplayStyle.Thin} />
    )
    expect(queryByTestId(barWithLabelId)).not.toBeInTheDocument()
  })

  test("label should render", () => {
    const { getByTestId } = renderWithThemeAndIntl(
      <StackedBarChart
        chartData={chartData}
        displayStyle={DisplayStyle.Thick}
        labels
      />
    )
    expect(getByTestId(occupiedSpaceId)).toBeInTheDocument()
    expect(getByTestId(occupiedSpaceId)).toHaveTextContent(`17.2 GB( 100%)`)
  })

  test("number of elements rendered without label should equal to number of all elements - 1 (with label)", () => {
    const { getAllByTestId } = renderWithThemeAndIntl(
      <StackedBarChart
        chartData={chartData}
        displayStyle={DisplayStyle.Thick}
        labels
      />
    )
    expect(getAllByTestId(barId).length).toEqual(chartData.length - 1)
  })
})
