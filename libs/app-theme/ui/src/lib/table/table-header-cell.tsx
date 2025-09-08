/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import React, { FunctionComponent, PropsWithChildren } from "react"
import { TableCell } from "./table-cell"

interface Props extends PropsWithChildren {
  colSpan?: number
  rowSpan?: number
  width?: number | string
}

const Wrapper = (props: any) => {
  console.log("Rendering TableHeaderCell", props)
  return <TableCell {...props} as={"th"} />
}

export const TableHeaderCell: FunctionComponent<Props> = (props) => (
  <Wrapper {...props} />
)
