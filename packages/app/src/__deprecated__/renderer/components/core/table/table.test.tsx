/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import "@testing-library/jest-dom/extend-expect"
import React from "react"
import { Checkbox, Files } from "App/__deprecated__/renderer/components/core/table/table.stories"
import { renderWithThemeAndIntl } from "App/__deprecated__/renderer/utils/render-with-theme-and-intl"
import {
  Col,
  Group,
  Labels,
  NestedGroup,
  Row,
  Sidebar,
} from "App/__deprecated__/renderer/components/core/table/table.component"
import useTableSelect from "App/__deprecated__/renderer/utils/hooks/useTableSelect"
import { nestedRows } from "App/__deprecated__/renderer/components/core/table/table.fake-data"
import { fireEvent } from "@testing-library/dom"

// Basic table
const renderBasicTable = (
  hideableColumnsIndexes: number[] = [],
  hideColumns = false
) => {
  const outcome = renderWithThemeAndIntl(
    <Files
      hideableColumnsIndexes={hideableColumnsIndexes}
      hideColumns={hideColumns}
    >
      <Labels>
        <Col data-testid="label">File type</Col>
        <Col data-testid="label">Last backup</Col>
        <Col data-testid="label">Size</Col>
      </Labels>
      <Row>
        <Col data-testid="column">Music</Col>
        <Col data-testid="column">{new Date().toLocaleString()}</Col>
        <Col data-testid="column">50 MB</Col>
      </Row>
    </Files>
  )
  return {
    ...outcome,
    getLabels: () => outcome.queryAllByTestId("label"),
    getColumns: () => outcome.queryAllByTestId("column"),
  }
}

test("renders basic table with labels properly", () => {
  const { getLabels } = renderBasicTable()
  expect(getLabels()).toHaveLength(3)
  expect(getLabels()[0]).toBeVisible()
  expect(getLabels()[1]).toBeVisible()
  expect(getLabels()[2]).toBeVisible()
})

test("renders basic table with hidden labels properly", () => {
  const { getLabels } = renderBasicTable([1], true)
  expect(getLabels()[0]).toBeVisible()
  expect(getLabels()[1]).not.toBeVisible()
  expect(getLabels()[2]).toBeVisible()
})

test("renders basic table with data properly", () => {
  const { getColumns } = renderBasicTable()
  expect(getColumns()).toHaveLength(3)
  expect(getColumns()[0]).toBeVisible()
  expect(getColumns()[1]).toBeVisible()
  expect(getColumns()[2]).toBeVisible()
})

test("renders basic table with hidden columns properly", () => {
  const { getColumns } = renderBasicTable([1], true)
  expect(getColumns()[0]).toBeVisible()
  expect(getColumns()[1]).not.toBeVisible()
  expect(getColumns()[2]).toBeVisible()
})

// Grouped table
const renderGroupedTable = (
  hideableColumnsIndexes: number[] = [],
  hideColumns = false
) => {
  const outcome = renderWithThemeAndIntl(
    <Files
      hideableColumnsIndexes={hideableColumnsIndexes}
      hideColumns={hideColumns}
    >
      <Group>
        <Labels>
          <Col data-testid="label">Favourites</Col>
        </Labels>
        <Row>
          <Col data-testid="column">Music</Col>
          <Col data-testid="column">{new Date().toLocaleString()}</Col>
          <Col data-testid="column">50 MB</Col>
        </Row>
      </Group>
    </Files>
  )
  return {
    ...outcome,
    getLabels: () => outcome.queryAllByTestId("label"),
    getColumns: () => outcome.queryAllByTestId("column"),
  }
}

test("renders group label properly", () => {
  const { getLabels } = renderGroupedTable()
  expect(getLabels()).toHaveLength(1)
  expect(getLabels()[0]).toBeVisible()
})

test("renders group label with hidden columns properly", () => {
  const { getLabels } = renderGroupedTable([1], true)
  expect(getLabels()).toHaveLength(1)
  expect(getLabels()[0]).toBeVisible()
})

test("renders grouped table with columns properly", () => {
  const { getColumns } = renderGroupedTable()
  expect(getColumns()).toHaveLength(3)
  expect(getColumns()[0]).toBeVisible()
  expect(getColumns()[1]).toBeVisible()
  expect(getColumns()[2]).toBeVisible()
})

test("renders grouped table with hidden columns properly", () => {
  const { getColumns } = renderGroupedTable([1], true)
  expect(getColumns()[0]).toBeVisible()
  expect(getColumns()[1]).not.toBeVisible()
  expect(getColumns()[2]).toBeVisible()
})

// Nested table
const renderNestedTable = (
  hideableColumnsIndexes: number[] = [],
  hideColumns = false
) => {
  const outcome = renderWithThemeAndIntl(
    <Files
      hideableColumnsIndexes={hideableColumnsIndexes}
      hideColumns={hideColumns}
    >
      <Labels>
        <Col data-testid="label">File type</Col>
        <Col data-testid="label">Last backup</Col>
        <Col data-testid="label">Size</Col>
      </Labels>
      <Row>
        <Col data-testid="column">Music</Col>
        <Col data-testid="column">{new Date().toLocaleString()}</Col>
        <Col data-testid="column">50 MB</Col>
      </Row>
      <NestedGroup>
        <Row>
          <Col data-testid="column">Ringtones</Col>
          <Col data-testid="column">{new Date().toLocaleString()}</Col>
          <Col data-testid="column">10 MB</Col>
        </Row>
        <Row>
          <Col data-testid="column">Songs</Col>
          <Col data-testid="column">{new Date().toLocaleString()}</Col>
          <Col data-testid="column">40 MB</Col>
        </Row>
      </NestedGroup>
    </Files>
  )
  return {
    ...outcome,
    getLabels: () => outcome.queryAllByTestId("label"),
    getColumns: () => outcome.queryAllByTestId("column"),
  }
}

test("renders nested data properly", () => {
  const { getColumns } = renderNestedTable()
  expect(getColumns()).toHaveLength(9)
  for (let i = 0; i < 9; i++) {
    expect(getColumns()[i]).toBeVisible()
  }
})

test("renders nested data with hidden columns properly", () => {
  const { getColumns } = renderNestedTable([1], true)
  for (let i = 0; i < 9; i++) {
    if (i % 3 === 1) {
      expect(getColumns()[i]).not.toBeVisible()
    } else {
      expect(getColumns()[i]).toBeVisible()
    }
  }
})

// Selecting rows
const NestedSelectableTable = () => {
  const {
    toggleRow,
    toggleAll,
    getRowStatus,
    allRowsSelected,
    noneRowsSelected,
  } = useTableSelect(nestedRows)

  const SingleRow = ({ data, ...rest }: any) => {
    const onChange = () => {
      toggleRow(data)
    }
    const { selected, indeterminate } = getRowStatus(data)
    return (
      <Row {...rest}>
        <Col>
          <Checkbox
            checked={selected}
            indeterminate={indeterminate}
            onChange={onChange}
            data-testid="row-checkbox"
          />
          <div>{data.fileType}</div>
        </Col>
        <Col>{new Date(data.lastBackup).toLocaleString()}</Col>
        <Col>{data.size}</Col>
      </Row>
    )
  }

  return (
    <Files>
      <Labels>
        <Col>
          <Checkbox
            onChange={toggleAll}
            checked={allRowsSelected}
            indeterminate={!allRowsSelected && !noneRowsSelected}
            data-testid="main-checkbox"
          />
          <div>File type</div>
        </Col>
        <Col>Last backup</Col>
        <Col>Size</Col>
      </Labels>
      {nestedRows.map((row, index) => (
        <React.Fragment key={index}>
          <SingleRow data={row} />
          {row._children && (
            <NestedGroup>
              {row._children.map((childRow, childIndex) => (
                <SingleRow data={childRow} key={childIndex} />
              ))}
            </NestedGroup>
          )}
        </React.Fragment>
      ))}
    </Files>
  )
}

const renderNestedSelectableTable = () => {
  const outcome = renderWithThemeAndIntl(<NestedSelectableTable />)
  return {
    ...outcome,
    getRowCheckboxes: () => outcome.getAllByTestId("row-checkbox"),
  }
}

test("selecting all rows works properly", () => {
  const { getByTestId, getRowCheckboxes } = renderNestedSelectableTable()

  fireEvent.click(getByTestId("main-checkbox"))

  getRowCheckboxes().forEach((checkbox) => {
    expect(checkbox).toBeChecked()
  })
})

test("selecting single (non-parent) row works properly", () => {
  const { getRowCheckboxes, queryByTestId } = renderNestedSelectableTable()

  fireEvent.click(getRowCheckboxes()[0])

  expect(getRowCheckboxes()[0]).toBeChecked()
  expect(queryByTestId("icon-CheckIndeterminate")).toBeInTheDocument()
})

test("selecting single (parent) row works properly", () => {
  const { getRowCheckboxes, queryByTestId } = renderNestedSelectableTable()

  fireEvent.click(getRowCheckboxes()[2])

  for (let i = 2; i < 5; i++) {
    expect(getRowCheckboxes()[i]).toBeChecked()
  }
  expect(queryByTestId("icon-CheckIndeterminate")).toBeInTheDocument()
})

test("selecting single (nested) row works properly", () => {
  const { getRowCheckboxes, queryAllByTestId } = renderNestedSelectableTable()

  fireEvent.click(getRowCheckboxes()[4])

  expect(getRowCheckboxes()[4]).toBeChecked()
  expect(queryAllByTestId("icon-CheckIndeterminate")).toHaveLength(2)
})

test("selecting all nested rows works properly", () => {
  const { getRowCheckboxes, queryByTestId } = renderNestedSelectableTable()

  for (let i = 3; i < 6; i++) {
    fireEvent.click(getRowCheckboxes()[i])
  }

  for (let i = 2; i < 5; i++) {
    expect(getRowCheckboxes()[i]).toBeChecked()
  }
  expect(queryByTestId("icon-CheckIndeterminate")).toBeInTheDocument()
})

test("sidebar renders close button properly", () => {
  const { getByRole } = renderWithThemeAndIntl(<Sidebar />)
  expect(getByRole("button")).toBeInTheDocument()
})

test("sidebar close button works properly", () => {
  const onClose = jest.fn()
  const { getByRole } = renderWithThemeAndIntl(<Sidebar onClose={onClose} />)
  fireEvent.click(getByRole("button"))
  expect(onClose).toBeCalled()
})

test("sidebar renders content correctly", () => {
  const { getByText } = renderWithThemeAndIntl(<Sidebar>Content</Sidebar>)
  expect(getByText("Content")).toBeInTheDocument()
})

test("sidebar renders header slots correctly", () => {
  const { getByText } = renderWithThemeAndIntl(
    <Sidebar headerLeft={<p>Left slot</p>} headerRight={<p>Right slot</p>} />
  )
  expect(getByText("Left slot")).toBeInTheDocument()
  expect(getByText("Right slot")).toBeInTheDocument()
})
