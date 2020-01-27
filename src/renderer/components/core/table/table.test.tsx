import "@testing-library/jest-dom/extend-expect"
import React from "react"
import {
  basicRows,
  nestedRows,
} from "Renderer/components/core/table/table.fake-data"
import {
  NestedTable,
  SimpleTable,
} from "Renderer/components/core/table/table.stories"
import { renderWithThemeAndIntl } from "Renderer/utils/render-with-theme-and-intl"

const renderSimpleTable = () => {
  const outcome = renderWithThemeAndIntl(<SimpleTable />)
  return {
    ...outcome,
    getRows: () => outcome.queryAllByTestId("row"),
  }
}

const renderNestedTable = () => {
  const outcome = renderWithThemeAndIntl(<NestedTable />)
  return {
    ...outcome,
    getRows: () => outcome.queryAllByTestId("row"),
    getNestedRows: () => outcome.queryAllByTestId("nested-row"),
    getColumnLabels: () => outcome.queryAllByTestId("column-label"),
  }
}

test("simple table matches snapshot", () => {
  const { container } = renderSimpleTable()
  expect(container).toMatchSnapshot()
})

test("nested table matches snapshot", () => {
  const { container } = renderNestedTable()
  expect(container).toMatchSnapshot()
})

test("render rows properly", () => {
  const { getRows } = renderSimpleTable()
  expect(getRows()).toHaveLength(basicRows.length)
})

test("render columns labels properly", () => {
  const { getColumnLabels } = renderNestedTable()
  expect(getColumnLabels()).toHaveLength(3)
  expect(getColumnLabels()[1]).toHaveTextContent("Last backup")
})

test("render nested rows properly", () => {
  const { getRows, getNestedRows } = renderNestedTable()
  expect(getRows()).toHaveLength(nestedRows.length)
  expect(getNestedRows()).toHaveLength(3)
})
