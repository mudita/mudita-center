import { renderWithThemeAndIntl } from "Renderer/utils/render-with-theme-and-intl"
import React from "react"
import CallsHeader from "Renderer/components/rest/calls/calls-header.component"
import { VisibilityFilter } from "Renderer/models/calls/calls.interface"

const testFilters = [
  VisibilityFilter.All,
  VisibilityFilter.Received,
  VisibilityFilter.Missed,
]

describe("visibility filter changes", () => {
  testFilters.forEach(filter => {
    test(`filter: ${filter}`, () => {
      const changeVisibilityFilter = jest.fn()
      const { getByTestId } = renderWithThemeAndIntl(
        <CallsHeader changeVisibilityFilter={changeVisibilityFilter} />
      )
      const button = getByTestId(filter)
      button.click()
      expect(changeVisibilityFilter).toBeCalled()
      expect(changeVisibilityFilter).toHaveBeenCalledWith(filter)
    })
  })
})
