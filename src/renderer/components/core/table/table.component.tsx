import React from "react"
import {
  TableData,
  TableHeader,
  TableLabels,
  TableRow,
  TableSidebar,
  TableWrapper,
} from "Renderer/components/core/table/table.elements"
import { TableProps } from "Renderer/components/core/table/table.interface"
import FunctionComponent from "Renderer/types/function-component.interface"

const Table: FunctionComponent<TableProps> = ({
  className,
  rows,
  labels,
  labelsLayout,
  sidebar,
}) => {
  return (
    <TableWrapper className={className}>
      <TableHeader>
        <TableLabels layout={labelsLayout} data-testid="table-labels">
          {labels &&
            labels.map(label => (
              <p key={label} data-testid="label">
                {label}&nbsp;&nbsp;
              </p>
            ))}
        </TableLabels>
      </TableHeader>
      <TableData>
        {Boolean(rows.length) ? (
          rows.map((row, index) => {
            return (
              <TableRow key={index} data-testid="row">
                {row.firstName} {row.lastName}
              </TableRow>
            )
          })
        ) : (
          <p>No data available</p>
        )}
      </TableData>
      {sidebar && <TableSidebar>{sidebar}</TableSidebar>}
    </TableWrapper>
  )
}

export default Table
