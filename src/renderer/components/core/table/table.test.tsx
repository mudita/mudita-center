import "@testing-library/jest-dom/extend-expect"
import React from "react"
import Table from "Renderer/components/core/table/table.component"
import { TableProps } from "Renderer/components/core/table/table.interface"
import { renderWithThemeAndIntl } from "Renderer/utils/render-with-theme-and-intl"

const renderTable = ({ ...props }: Partial<TableProps> = {}) => {
  const outcome = renderWithThemeAndIntl(<Table {...props} />)
  return {
    ...outcome,
  }
}

test("matches snapshot", () => {
  const { container } = renderTable()
  expect(container).toMatchSnapshot()
})
