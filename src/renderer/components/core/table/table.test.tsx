import "@testing-library/jest-dom/extend-expect"
import React from "react"
import Table from "Renderer/components/core/table/table.component"
import { TableProps } from "Renderer/components/core/table/table.interface"
import {
  fakeTableLabels,
  fakeTableRows,
  labelsLayout,
  Sidebar,
} from "Renderer/components/core/table/table.stories"
import { renderWithThemeAndIntl } from "Renderer/utils/render-with-theme-and-intl"

const renderTable = ({
  rows = fakeTableRows,
  labels = [],
  ...props
}: Partial<TableProps> = {}) => {
  const outcome = renderWithThemeAndIntl(
    <Table rows={rows} labels={labels} {...props} />
  )
  return {
    ...outcome,
    getHeader: () => outcome.container.querySelector("header"),
    getMain: () => outcome.container.querySelector("main"),
    getSidebar: () => outcome.container.querySelector("aside"),
    getLabelsWrapper: () => outcome.getByTestId("table-labels"),
    getLabels: () => outcome.queryAllByTestId("label"),
    getRows: () => outcome.queryAllByTestId("row"),
  }
}

test("has header component", () => {
  const { getHeader } = renderTable()
  expect(getHeader()).toBeInTheDocument()
})

test("has main component", () => {
  const { getMain } = renderTable()
  expect(getMain()).toBeInTheDocument()
})

test("has no sidebar component by default", () => {
  const { getSidebar } = renderTable({})
  expect(getSidebar()).not.toBeInTheDocument()
})

test("has sidebar component when 'sidebar' option is passed", () => {
  const { getSidebar, getByText } = renderTable({ sidebar: <Sidebar /> })
  expect(getSidebar()).toBeInTheDocument()
  expect(getByText("Some sidebar stuff")).toBeInTheDocument()
})

test("render labels properly", () => {
  const { getLabelsWrapper, getLabels } = renderTable({
    labels: fakeTableLabels,
  })
  expect(getLabelsWrapper()).toBeInTheDocument()
  expect(getLabels()).toHaveLength(fakeTableLabels.length)
})

test("render labels with custom layout", () => {
  const { getLabelsWrapper } = renderTable({
    labels: fakeTableLabels,
    labelsLayout,
  })
  expect(getLabelsWrapper()).toHaveStyle(`grid-template-columns: 3fr 2fr;`)
})

test("render rows properly", () => {
  const { getRows } = renderTable()
  expect(getRows()).toHaveLength(fakeTableRows.length)
})

test("render empty table properly", () => {
  const { getRows, getByText } = renderTable({ rows: [] })
  expect(getRows()).toHaveLength(0)
  expect(getByText("No data available")).toBeInTheDocument()
})
