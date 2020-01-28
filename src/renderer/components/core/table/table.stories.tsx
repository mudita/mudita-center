import { storiesOf } from "@storybook/react"
import React from "react"
import Table, {
  HideableCol,
  NestedRows,
  RowSize,
  TableCol,
  TableLabels,
  TableRow,
} from "Renderer/components/core/table/table.component"
import {
  basicRows,
  nestedRows,
} from "Renderer/components/core/table/table.fake-data"
import styled from "styled-components"

const CustomizedBasicTable = styled(Table)`
  --columnsTemplate: 1fr 1fr 10rem;
  --columnsTemplateWithOpenedSidebar: 1fr 1fr;
`

const CustomizedNestedTable = styled(Table)`
  --columnsTemplate: 1fr 1fr;
  --columnsTemplateWithOpenedSidebar: 1fr;
`

export const BasicTable = ({ sidebarOpened = false }) => {
  const Row = ({ data }: { data: typeof basicRows[number] }) => (
    <TableRow data-testid="row">
      <TableCol>
        {data.firstName} {data.lastName}
      </TableCol>
      <HideableCol>{data.phoneNumber}</HideableCol>
    </TableRow>
  )
  return (
    <CustomizedBasicTable sidebarOpened={sidebarOpened}>
      <TableLabels>
        <TableCol data-testid="column-label">Name</TableCol>
        <HideableCol data-testid="column-label">Phone</HideableCol>
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
      <TableCol>{data.fileType}</TableCol>
      <TableCol>{new Date(data.lastBackup).toLocaleString()}</TableCol>
      <HideableCol>{data.size}</HideableCol>
    </TableRow>
  )
  return (
    <CustomizedNestedTable sidebarOpened={sidebarOpened}>
      <TableLabels>
        <TableCol data-testid="column-label">File type</TableCol>
        <TableCol data-testid="column-label">Last backup</TableCol>
        <HideableCol data-testid="column-label">Size</HideableCol>
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
