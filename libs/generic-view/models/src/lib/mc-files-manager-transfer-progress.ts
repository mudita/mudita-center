/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { z } from "zod"

const dataValidator = z.undefined()

const configValidator = z.object({
  storagePath: z.string().optional(),
  directoryPath: z.string(),
  entitiesType: z.string(),
  transferActionId: z.string(),
  actionType: z.string(),
})

export type McFilesManagerTransferProgressConfig = z.infer<
  typeof configValidator
>

export const mcFilesManagerTransferProgress = {
  key: "mc-files-manager-transfer-progress",
  dataValidator,
  configValidator,
} as const
