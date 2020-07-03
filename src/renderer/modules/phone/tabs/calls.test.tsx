import React from "react"
import { CallsTableTestIds } from "Renderer/components/rest/calls/calls-table.enum"
import { renderWithThemeAndIntl } from "Renderer/utils/render-with-theme-and-intl"
import { mockData } from "App/__mocks__/calls-mock-data"
import { intl } from "Renderer/utils/intl"
import Calls from "Renderer/modules/phone/tabs/calls.component"

const renderer = () => {
  return renderWithThemeAndIntl(<Calls calls={mockData} />)
}

test("render correct amount of rows", () => {
  const { getAllByTestId } = renderer()
  expect(getAllByTestId(CallsTableTestIds.CallsRow)).toHaveLength(
    mockData.length
  )
})

test("caller name is displayed correctly", () => {
  const { getAllByTestId } = renderer()
  const examplesIndex = 0
  const exampleRow = getAllByTestId(CallsTableTestIds.CallerName)[examplesIndex]
  expect(exampleRow).toHaveTextContent(
    `${mockData[examplesIndex].caller.firstName} ${mockData[examplesIndex].caller.lastName} (${mockData[examplesIndex].timesMissed})`
  )
})

test("when caller is unknown, displays only phone number + times missed", () => {
  const { getAllByTestId } = renderer()
  const examplesIndex = 2
  const unknownsCallerCol = getAllByTestId(CallsTableTestIds.CallerName)[
    examplesIndex
  ]
  expect(unknownsCallerCol).toHaveTextContent(
    `${mockData[examplesIndex].caller.primaryPhoneNumber} (${mockData[examplesIndex].timesMissed})`
  )
})

test("past date is displayed correctly", () => {
  const { getAllByTestId } = renderer()
  const pastDataExampleCol = getAllByTestId("call-date")[0]
  expect(pastDataExampleCol).toHaveTextContent(`Jul 2, 2019`)
})

test("past date is displayed correctly", () => {
  const { getAllByTestId } = renderer()
  const pastDataExampleCol = getAllByTestId("call-date")[0]
  expect(pastDataExampleCol).toHaveTextContent(`Jul 2, 2019`)
})

test("dropdown call button has correct content", () => {
  const { getAllByTestId } = renderer()
  expect(getAllByTestId("dropdown-call")[0]).toHaveTextContent(
    intl.formatMessage(
      {
        id: "component.dropdown.call",
      },
      { name: mockData[0].caller.firstName }
    )
  )
})

test("send message button has correct content", () => {
  const { getAllByTestId } = renderer()
  expect(getAllByTestId("send-message")[0]).toHaveTextContent(
    intl.formatMessage({
      id: "view.name.phone.calls.sendMessage",
    })
  )
})

test("call details button has correct content", () => {
  const { getAllByTestId } = renderer()
  expect(getAllByTestId("call-details")[0]).toHaveTextContent(
    intl.formatMessage({
      id: "view.name.phone.calls.details",
    })
  )
})

test("delete call button has correct content", () => {
  const { getAllByTestId } = renderer()
  expect(getAllByTestId("delete-call")[0]).toHaveTextContent(
    intl.formatMessage({
      id: "view.name.phone.calls.deleteCall",
    })
  )
})

test("details are shown on click", () => {
  const { queryByTestId, getAllByTestId } = renderer()

  expect(queryByTestId(CallsTableTestIds.CallDetails)).not.toBeInTheDocument()
  getAllByTestId(CallsTableTestIds.CallerName)[0].click()
  expect(queryByTestId(CallsTableTestIds.CallDetails)).toBeInTheDocument()
})
