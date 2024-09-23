/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { z } from "zod"

const dataValidator = z.undefined()

const configValidator = z.object({
  width: z.number(),
  colSpan: z.number().optional(),
  rowSpan: z.number().optional(),
})

export type TableCellConfig = z.infer<typeof configValidator>

export const tableCell = {
  key: "table.cell",
  dataValidator,
  configValidator,
} as const
