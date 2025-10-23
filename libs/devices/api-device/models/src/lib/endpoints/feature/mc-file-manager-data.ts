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

const StorageInformationValidator = z.object({
  path: z.string(),
  totalSpaceBytes: z.number().nonnegative(),
  usedSpaceBytes: z.number().nonnegative(),
  freeSpaceBytes: z.number().nonnegative(),
  totalSpaceString: z.string(),
  usedSpaceString: z.string(),
  freeSpaceString: z.string(),
  categoriesSpaceInformation: z.record(z.string(), storageCategoryValidator),
})

export type StorageInformation = z.output<typeof StorageInformationValidator>

export const McFileManagerDataResponseValidator = z.object({
  storageInformation: z.array(StorageInformationValidator).min(1),
})

export type McFileManagerDataResponse = z.output<
  typeof McFileManagerDataResponseValidator
>
