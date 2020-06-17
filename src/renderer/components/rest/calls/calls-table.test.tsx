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

test("caller name is displayed correctly", () => {
  const { getAllByTestId } = renderWithThemeAndIntl(
    <CallsTable calls={mockData} />
  )
  const examplesIndex = 0
  const exampleRow = getAllByTestId("caller-name")[examplesIndex]
  expect(exampleRow).toHaveTextContent(
    `${mockData[examplesIndex].caller.firstName} ${mockData[examplesIndex].caller.lastName} (${mockData[examplesIndex].timesMissed})`
  )
})

test("when caller is unknown, displays only phone number + times missed", () => {
  const { getAllByTestId } = renderWithThemeAndIntl(
    <CallsTable calls={mockData} />
  )
  const examplesIndex = 2
  const unknownsCallerCol = getAllByTestId("caller-name")[examplesIndex]
  expect(unknownsCallerCol).toHaveTextContent(
    `${mockData[examplesIndex].caller.primaryPhoneNumber} (${mockData[examplesIndex].timesMissed})`
  )
})

test("past date is displayed correctly", () => {
  const { getAllByTestId } = renderWithThemeAndIntl(
    <CallsTable calls={mockData} />
  )
  const pastDataExampleCol = getAllByTestId("call-date")[0]
  expect(pastDataExampleCol).toHaveTextContent(`Jul 2, 2019`)
})
