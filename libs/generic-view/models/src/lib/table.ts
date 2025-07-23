/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { z } from "zod"

const dataValidator = z.array(z.string()).optional()

export type TableData = z.infer<typeof dataValidator>

const configValidator = z.object({
  formOptions: z.object({
    formKey: z.string().optional(),
    activeIdFieldName: z.string().optional(),
    selectedIdsFieldName: z.string().optional(),
    allIdsFieldName: z.string().optional(),
  }),
  previewOptions: z
    .object({
      enabled: z.boolean(),
      entitiesType: z.string(),
      entityIdFieldName: z.string(),
      entityPathFieldName: z.string(),
    })
    .optional(),
})

export type TableConfig = z.infer<typeof configValidator>

export const table = {
  key: "table",
  dataValidator,
  configValidator,
} as const
