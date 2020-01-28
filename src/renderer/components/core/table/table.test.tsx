import "@testing-library/jest-dom/extend-expect"
import React from "react"
import {
  basicRows,
  nestedRows,
} from "Renderer/components/core/table/table.fake-data"
import {
  BasicTable,
  NestedTable,
} from "Renderer/components/core/table/table.stories"
import { renderWithThemeAndIntl } from "Renderer/utils/render-with-theme-and-intl"

const renderBasicTable = ({ sidebarOpened = false } = {}) => {
  const outcome = renderWithThemeAndIntl(
    <BasicTable sidebarOpened={sidebarOpened} />
  )
  return {
    ...outcome,
    getRows: () => outcome.queryAllByTestId("row"),
    getColumnsLabels: () => outcome.queryAllByTestId("column-label"),
  }
}

const renderNestedTable = ({ sidebarOpened = false } = {}) => {
  const outcome = renderWithThemeAndIntl(
    <NestedTable sidebarOpened={sidebarOpened} />
  )
  return {
    ...outcome,
    getRows: () => outcome.queryAllByTestId("row"),
    getNestedRows: () => outcome.queryAllByTestId("nested-row"),
    getColumnsLabels: () => outcome.queryAllByTestId("column-label"),
  }
}

test("basic table matches snapshot", () => {
  const { container } = renderBasicTable()
  expect(container).toMatchSnapshot()
})

test("basic table render rows properly", () => {
  const { getRows } = renderBasicTable()
  expect(getRows()).toHaveLength(basicRows.length)
})

test("basic table render columns labels properly", () => {
  const { getColumnsLabels } = renderBasicTable()
  expect(getColumnsLabels()).toHaveLength(2)
  expect(getColumnsLabels()[0]).toHaveTextContent("Name")
  expect(getColumnsLabels()[1]).toHaveTextContent("Phone")
})

test("basic table render columns data properly", () => {
  const { getRows } = renderBasicTable()
  const cols = getRows()[5].querySelectorAll("div")
  const rowData = basicRows[5]

  expect(cols[0]).toHaveTextContent(`${rowData.firstName} ${rowData.lastName}`)
  expect(cols[1]).toHaveTextContent(rowData.phoneNumber)
})

test("basic table with sidebar opened render columns properly", () => {
  const { getRows, getColumnsLabels } = renderBasicTable({
    sidebarOpened: true,
  })
  const cols = getRows()[5].querySelectorAll("div")
  expect(cols[0]).toBeVisible()
  expect(cols[1]).not.toBeVisible()

  expect(getColumnsLabels()[0]).toBeVisible()
  expect(getColumnsLabels()[1]).not.toBeVisible()
})

test("nested table matches snapshot", () => {
  const { container } = renderNestedTable()
  expect(container).toMatchSnapshot()
})

test("nested table render rows properly", () => {
  const { getRows, getNestedRows } = renderNestedTable()
  expect(getRows()).toHaveLength(nestedRows.length)
  expect(getNestedRows()).toHaveLength(3)
})

test("nested table render columns labels properly", () => {
  const { getColumnsLabels } = renderNestedTable()
  expect(getColumnsLabels()).toHaveLength(3)
  expect(getColumnsLabels()[0]).toHaveTextContent("File type")
  expect(getColumnsLabels()[1]).toHaveTextContent("Last backup")
  expect(getColumnsLabels()[2]).toHaveTextContent("Size")
})

test("nested table render columns data properly", () => {
  const { getNestedRows } = renderNestedTable()
  const cols = getNestedRows()[2].querySelectorAll("div")
  const rowData = nestedRows[2]._children?.[2]

  expect(rowData).toBeTruthy()

  if (rowData) {
    expect(cols[0]).toHaveTextContent(rowData.fileType)
    expect(cols[1]).toHaveTextContent(
      new Date(rowData.lastBackup).toLocaleString()
    )
    expect(cols[2]).toHaveTextContent(rowData.size)
  }
})

test("nested table with sidebar opened render columns properly", () => {
  const { getRows, getColumnsLabels } = renderNestedTable({
    sidebarOpened: true,
  })
  const cols = getRows()[2].querySelectorAll("div")

  expect(cols[0]).toBeVisible()
  expect(cols[1]).toBeVisible()
  expect(cols[2]).not.toBeVisible()

  expect(getColumnsLabels()[0]).toBeVisible()
  expect(getColumnsLabels()[1]).toBeVisible()
  expect(getColumnsLabels()[2]).not.toBeVisible()
})
