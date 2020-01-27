import { storiesOf } from "@storybook/react"
import React from "react"
import Table, {
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

export const SimpleTable = () => {
  const Row = ({ data }: { data: typeof basicRows[number] }) => (
    <TableRow data-testid="row">
      <TableCol>
        {data.firstName} {data.lastName}
      </TableCol>
      <TableCol>{data.phoneNumber}</TableCol>
    </TableRow>
  )
  return (
    <Table>
      <TableLabels>
        <TableCol>Name</TableCol>
        <TableCol>Phone</TableCol>
      </TableLabels>
      {basicRows.map((row, index) => (
        <Row key={index} data={row} />
      ))}
    </Table>
  )
}

const TableWithCustomizedColumnsTemplate = styled(Table)`
  --columnsTemplate: 1fr 1fr 5rem;
  --nestSize: 4rem;
`

export const NestedTable = () => {
  const Row = ({ data, ...rest }: any) => (
    <TableRow {...rest}>
      <TableCol>{data.fileType}</TableCol>
      <TableCol>{new Date(data.lastBackup).toLocaleString()}</TableCol>
      <TableCol>{data.size}</TableCol>
    </TableRow>
  )
  return (
    <TableWithCustomizedColumnsTemplate>
      <TableLabels>
        <TableCol data-testid="column-label">File type</TableCol>
        <TableCol data-testid="column-label">Last backup</TableCol>
        <TableCol data-testid="column-label">Size</TableCol>
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
    </TableWithCustomizedColumnsTemplate>
  )
}

storiesOf("Components|Table", module)
  .add("Basic", () => <SimpleTable />)
  .add("Nested", () => <NestedTable />)
