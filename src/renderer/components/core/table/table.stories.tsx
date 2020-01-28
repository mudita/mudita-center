import { storiesOf } from "@storybook/react"
import React from "react"
import Table, {
  GroupedRows,
  GroupLabel,
  NestedRows,
  RowSize,
  TableCol,
  TableLabels,
  TableRow,
} from "Renderer/components/core/table/table.component"
import {
  basicRows,
  labeledRows,
  nestedRows,
} from "Renderer/components/core/table/table.fake-data"
import styled from "styled-components"

const CustomizedBasicTable = styled(Table)`
  --columnsTemplate: 1fr 1fr;
  --columnsTemplateWithOpenedSidebar: 1fr;
`

const CustomizedNestedTable = styled(Table)`
  --columnsTemplate: 1fr 1fr 10rem;
  --columnsTemplateWithOpenedSidebar: 1fr;
`

const ColWithPadding = styled(TableCol)`
  padding-left: 2rem;
`

export const BasicTable = ({ sidebarOpened = false }) => {
  const Row = ({ data }: { data: typeof basicRows[number] }) => (
    <TableRow data-testid="row">
      <ColWithPadding>
        {data.firstName} {data.lastName}
      </ColWithPadding>
      <TableCol hideable>{data.phoneNumber}</TableCol>
    </TableRow>
  )
  return (
    <CustomizedBasicTable sidebarOpened={sidebarOpened}>
      <TableLabels>
        <ColWithPadding data-testid="column-label">Name</ColWithPadding>
        <TableCol hideable data-testid="column-label">
          Phone
        </TableCol>
      </TableLabels>
      {basicRows.map((row, index) => (
        <Row key={index} data={row} />
      ))}
    </CustomizedBasicTable>
  )
}

export const NestedTable = ({ sidebarOpened = false }) => {
  const Row = ({ data, ...rest }: any) => (
    <TableRow {...rest}>
      <ColWithPadding>{data.fileType}</ColWithPadding>
      <TableCol hideable>{new Date(data.lastBackup).toLocaleString()}</TableCol>
      <TableCol hideable>{data.size}</TableCol>
    </TableRow>
  )
  return (
    <CustomizedNestedTable sidebarOpened={sidebarOpened}>
      <TableLabels>
        <ColWithPadding data-testid="column-label">File type</ColWithPadding>
        <TableCol hideable data-testid="column-label">
          Last backup
        </TableCol>
        <TableCol hideable data-testid="column-label">
          Size
        </TableCol>
      </TableLabels>
      {nestedRows.map((row, index) => (
        <React.Fragment key={index}>
          <Row data={row} size={RowSize.Small} data-testid="row" />
          {row._children && (
            <NestedRows>
              {row._children.map((childRow, childIndex) => (
                <Row
                  data={childRow}
                  key={childIndex}
                  size={RowSize.Tiny}
                  data-testid="nested-row"
                />
              ))}
            </NestedRows>
          )}
        </React.Fragment>
      ))}
    </CustomizedNestedTable>
  )
}

export const GroupedTable = ({ sidebarOpened = false }) => {
  const Row = ({ data }: { data: typeof basicRows[number] }) => (
    <TableRow data-testid="row">
      <ColWithPadding>
        {data.firstName} {data.lastName}
      </ColWithPadding>
      <TableCol hideable>{data.phoneNumber}</TableCol>
    </TableRow>
  )
  return (
    <CustomizedBasicTable sidebarOpened={sidebarOpened}>
      {Object.keys(labeledRows).map(group => (
        <GroupedRows key={group} data-testid="group">
          <GroupLabel data-testid="group-label">
            <ColWithPadding>{group}</ColWithPadding>
          </GroupLabel>
          {labeledRows[group].map((row: any, rowIndex: number) => (
            <Row key={rowIndex} data={row} />
          ))}
        </GroupedRows>
      ))}
    </CustomizedBasicTable>
  )
}

storiesOf("Components|Table/Basic", module)
  .add("With column labels", () => <BasicTable />)
  .add("With column labels and hideable columns disabled", () => (
    <BasicTable sidebarOpened />
  ))

storiesOf("Components|Table/Nested", module)
  .add("With column labels", () => <NestedTable />)
  .add("With column labels and hideable columns disabled", () => (
    <NestedTable sidebarOpened />
  ))

storiesOf("Components|Table/Grouped", module)
  .add("With all columns", () => <GroupedTable />)
  .add("With hideable columns disabled", () => <GroupedTable sidebarOpened />)
