/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import {
  table as tableWrapper,
  tableCell,
  tableHeaderCell,
} from "generic-view/models"
import { Table } from "./table"

export const table = {
  [tableWrapper.key]: Table,
  [tableCell.key]: Table.Cell,
  [tableHeaderCell.key]: Table.HeaderCell,
}
