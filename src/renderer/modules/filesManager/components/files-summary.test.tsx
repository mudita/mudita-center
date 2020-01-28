import "@testing-library/jest-dom"
import React from "react"
import { Router } from "react-router"
import { fakeMemoryChartData } from "Renderer/modules/filesManager/components/fake-data"
import FilesSummary from "Renderer/modules/filesManager/components/files-summary.component"
import history from "Renderer/routes/history"
import { renderWithThemeAndIntl } from "Renderer/utils/render-with-theme-and-intl"

test("should match snapshot", () => {
  const { container } = renderWithThemeAndIntl(
    <Router history={history}>
      <FilesSummary memoryChartData={fakeMemoryChartData} />
    </Router>
  )
  expect(container.firstChild).toMatchSnapshot()
})

test("should render", () => {
  const { container } = renderWithThemeAndIntl(
    <Router history={history}>
      <FilesSummary memoryChartData={fakeMemoryChartData} />
    </Router>
  )
  expect(container.firstChild).toBeInTheDocument()
})

test("correct amount of items should render", () => {
  const testId = "files-manager-item"
  const { queryAllByTestId } = renderWithThemeAndIntl(
    <Router history={history}>
      <FilesSummary memoryChartData={fakeMemoryChartData} />
    </Router>
  )
  expect(queryAllByTestId(testId)).toHaveLength(4)
})
