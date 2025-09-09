/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { FunctionComponent } from "react"
import { TableCell, TableCellProps } from "./table-cell"

export const TABLE_HEADER_CELL_NAME = "TableHeaderCell"

export const TableHeaderCell: FunctionComponent<TableCellProps> = (props) => (
  <TableCell {...props} as={"th"} />
)
