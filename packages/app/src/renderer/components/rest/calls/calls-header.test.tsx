import { renderWithThemeAndIntl } from "Renderer/utils/render-with-theme-and-intl"
import React from "react"
import CallsHeader from "Renderer/components/rest/calls/calls-header.component"
import { VisibilityFilter } from "Renderer/models/calls/calls.interface"
import { CallsHeaderTestIds } from "Renderer/components/rest/calls/calls-header-test-ids.enum"
import { mockData } from "App/__mocks__/calls-mock-data"

const defaultProps = {
  changeVisibilityFilter: jest.fn(),
  onDeleteClick: jest.fn(),
  selectedCalls: [],
}

const renderer = (extraProps?: {}) => {
  const props = {
    ...defaultProps,
    ...extraProps,
  }
  return renderWithThemeAndIntl(<CallsHeader {...props} />)
}

test.each([
  [VisibilityFilter.All, VisibilityFilter.All],
  [VisibilityFilter.Received, VisibilityFilter.Received],
  [VisibilityFilter.Missed, VisibilityFilter.Missed],
])("visibility filter changes (%s, %s)", (firstArg, expectedResult) => {
  const { getByTestId } = renderer()
  const button = getByTestId(firstArg)
  button.click()
  expect(defaultProps.changeVisibilityFilter).toHaveBeenCalledWith(
    expectedResult
  )
})

test("unread filters are displayed by default", () => {
  const { getByTestId } = renderer()
  expect(getByTestId(CallsHeaderTestIds.UnreadFilters)).toBeInTheDocument()
})

test("when at least 1 item is selected, selection manager is displayed", () => {
  const { getByTestId } = renderer({ selectedCalls: mockData })
  expect(getByTestId(CallsHeaderTestIds.SelectionManager)).toBeInTheDocument()
})
