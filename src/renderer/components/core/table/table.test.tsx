import "@testing-library/jest-dom/extend-expect"
import { renderHook } from "@testing-library/react-hooks"
import React, { useCallback, useState } from "react"
import TableComponent from "Renderer/components/core/table/table.component"
import {
  basicRows,
  columnsBasic,
  columnsStructured,
  columnsWithoutLabels,
  labeledRows,
  structuredRows,
} from "Renderer/components/core/table/table.fake-data"
import {
  flattenRows,
  groupRows,
} from "Renderer/components/core/table/table.helpers"
import {
  TableComponentProps,
  UID,
} from "Renderer/components/core/table/table.interface"
import { sidebarRenderer } from "Renderer/components/core/table/table.stories"
import { renderWithThemeAndIntl } from "Renderer/utils/render-with-theme-and-intl"

const useSidebar = (rowId?: UID) => {
  const [activeId, setActiveId] = useState(rowId)
  const setId = useCallback(() => setActiveId, [activeId, setActiveId])
  return { activeId, setId }
}

const useSelect = (rowsIds: UID[] = []) => {
  const [selectedRowsIds, setSelectedRows] = useState<UID[]>(rowsIds)
  const setRows = useCallback(rows => setSelectedRows(rows), [
    selectedRowsIds,
    setSelectedRows,
  ])
  return { selectedRowsIds, setRows }
}

const renderTable = ({
  rows = basicRows,
  columns = columnsBasic,
  ...props
}: Partial<TableComponentProps> = {}) => {
  const outcome = renderWithThemeAndIntl(
    <TableComponent rows={rows} columns={columns} {...props} />
  )
  return {
    ...outcome,
    getMain: () => outcome.container.querySelector("main"),
    getSidebar: () => outcome.container.querySelector("aside"),
    getTableLabelsWrapper: () => outcome.getByTestId("table-labels"),
    getNativeAllToggler: () => outcome.getByTestId("native-toggle-all"),
    getColumnLabels: () => outcome.queryAllByTestId("column-label"),
    getRowLabels: () => outcome.queryAllByTestId("row-label"),
    getRows: () => outcome.queryAllByTestId("row"),
  }
}

test("has main component", () => {
  const { getMain } = renderTable()
  expect(getMain()).toBeInTheDocument()
})

test("has no sidebar component by default", () => {
  const { getSidebar } = renderTable()
  expect(getSidebar()).not.toBeInTheDocument()
})

test("sidebar renders properly when appropriate props are passed", () => {
  const { _uid, firstName, lastName } = basicRows[0]
  const {
    result: {
      current: { activeId, setId },
    },
  } = renderHook(() => useSidebar(_uid))

  const { getSidebar } = renderTable({
    activeRow: activeId,
    onRowActivate: setId,
    sidebarRenderer,
  })
  expect(getSidebar()).toBeInTheDocument()
  expect(getSidebar()).toHaveTextContent(`${firstName} ${lastName}`)
})

test("all columns are rendered when sidebar is inactive", () => {
  const {
    result: {
      current: { activeId, setId },
    },
  } = renderHook(() => useSidebar())

  const { getColumnLabels } = renderTable({
    activeRow: activeId,
    onRowActivate: setId,
    sidebarRenderer,
  })
  expect(getColumnLabels()).toHaveLength(columnsBasic.length)
})

test("only permanent columns are rendered when sidebar is active", () => {
  const {
    result: {
      current: { activeId, setId },
    },
  } = renderHook(() => useSidebar(basicRows[0]._uid))

  const { getColumnLabels } = renderTable({
    activeRow: activeId,
    onRowActivate: setId,
    sidebarRenderer,
  })
  expect(getColumnLabels()).toHaveLength(
    columnsBasic.filter(col => col.permanent).length
  )
})

test("render columns labels properly", () => {
  const { getTableLabelsWrapper, getColumnLabels } = renderTable()
  expect(getTableLabelsWrapper()).toBeInTheDocument()
  expect(getColumnLabels()).toHaveLength(columnsBasic.length)
  expect(getColumnLabels()[0]).toHaveTextContent(`${columnsBasic[0].label}`)
})

test("render rows labels properly", () => {
  const { getRowLabels } = renderTable({
    rows: labeledRows,
    columns: columnsWithoutLabels,
  })
  expect(getRowLabels()).toHaveLength(
    Object.keys(groupRows(labeledRows, true)).length
  )
  expect(getRowLabels()[0]).toHaveTextContent("Favourite")
})

test("render content properly", () => {
  const { getRows } = renderTable()
  const thirdRow = getRows()[2]
  const { firstName, lastName, phoneNumber } = basicRows[2]

  expect(thirdRow).toHaveTextContent(`${firstName} ${lastName}`)
  expect(thirdRow).toHaveTextContent(`${phoneNumber}`)
})

test("render empty table properly", () => {
  const { getRows, getByText } = renderTable({ rows: [] })
  expect(getRows()).toHaveLength(0)
  expect(getByText("No data available")).toBeInTheDocument()
})

test("render native toggle-all checkbox properly", () => {
  const {
    result: {
      current: { selectedRowsIds, setRows },
    },
  } = renderHook(() => useSelect())
  const { getTableLabelsWrapper, getNativeAllToggler } = renderTable({
    selectedRows: selectedRowsIds,
    onSelect: setRows,
    nativeAllSelector: true,
  })
  expect(getTableLabelsWrapper()).toContainElement(getNativeAllToggler())
})

test("render correct amount of rows", () => {
  const { getRows } = renderTable()
  expect(getRows()).toHaveLength(basicRows.length)
})

test("render correct amount of nested rows", () => {
  const { getRows } = renderTable({
    rows: structuredRows,
    columns: columnsStructured,
  })
  expect(getRows()).toHaveLength(flattenRows(structuredRows).length)
})
