/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { z } from "zod"

const storageCategoryValidator = z.object({
  spaceUsedBytes: z.number().nonnegative(),
  spaceUsedString: z.string(),
  storageCategory: z.string(),
})

export const mcFileManagerData = z.object({
  storageInformation: z
    .array(
      z.object({
        path: z.string().endsWith("/"),
        totalSpaceBytes: z.number().nonnegative(),
        usedSpaceBytes: z.number().nonnegative(),
        // TODO: `totalSpaceString` & `usedSpaceString` to pass-through after https://appnroll.atlassian.net/browse/CP-3275
        totalSpaceString: z.string(),
        usedSpaceString: z.string(),
        categoriesSpaceInformation: z.record(
          z.string(),
          storageCategoryValidator
        ),
      })
    )
    .min(1),
})

export type McFileManagerData = z.infer<typeof mcFileManagerData>

const configValidator = z.object({
  storages: z
    .array(
      z.object({
        label: z.string(),
        path: z.string().endsWith("/"),
      })
    )
    .min(1),
  categories: z
    .array(
      z.object({
        label: z.string(),
        directoryPath: z.string().endsWith("/"),
        entityType: z.string(),
        supportedFileTypes: z.array(z.string()),
      })
    )
    .min(1),
})

export type McFileManagerConfig = z.infer<typeof configValidator>

export const mcFileManagerView = {
  key: "mc-file-manager-view",
  dataValidator: mcFileManagerData,
  configValidator,
} as const
