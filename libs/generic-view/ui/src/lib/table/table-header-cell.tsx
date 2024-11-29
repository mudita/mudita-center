/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import React from "react"
import { APIFC } from "generic-view/utils"
import { TableCellConfig } from "generic-view/models"
import { TableCell } from "./table-cell"

// @ts-ignore
const Wrapper = (props) => <TableCell {...props} as={"th"} />

export const TableHeaderCell: APIFC<undefined, TableCellConfig> = (props) => (
  <Wrapper {...props} />
)
