import React from "react"
import { renderWithThemeAndIntl } from "Renderer/utils/render-with-theme-and-intl"
import CallsTable from "Renderer/components/rest/calls/calls-table.component"
import { mockData } from "App/__mocks__/calls-mock-data"

test("render correct amount of rows", () => {
  const { getAllByTestId } = renderWithThemeAndIntl(
    <CallsTable calls={mockData} />
  )
  expect(getAllByTestId("calls-row")).toHaveLength(mockData.length)
})
