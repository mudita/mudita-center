/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { z } from "zod"

const storageCategoryValidator = z.object({
  spaceUsedBytes: z.number(),
  spaceUsedString: z.string(),
  storageCategory: z.string(),
})

export const mcFileManagerData = z.object({
  storageInformation: z.array(
    z.object({
      storageType: z.string(),
      totalSpaceBytes: z.number(),
      usedSpaceBytes: z.number(),
      // TODO: `totalSpaceString` & `usedSpaceString` to pass-through after https://appnroll.atlassian.net/browse/CP-3275
      totalSpaceString: z.string(),
      usedSpaceString: z.string(),
      categoriesSpaceInformation: z.record(
        z.string(),
        storageCategoryValidator
      ),
    })
  ),
})

export type McFileManagerData = z.infer<typeof mcFileManagerData>

const configValidator = z.object({
  entityTypes: z.array(z.string()).min(1),
})

export type McFileManagerView = z.infer<typeof configValidator>

export const mcFileManagerView = {
  key: "mc-file-manager-view",
  dataValidator: mcFileManagerData,
  configValidator,
} as const
