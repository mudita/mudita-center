/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { z } from "zod"

const dataValidator = z.object({
  freeSpace: z.number(),
})

export type McFilesManagerTransferFinishedData = z.infer<typeof dataValidator>

const configValidator = z.object({
  modalKey: z.string(),
  transferActionId: z.string(),
  actionType: z.string(),
})

export type McFilesManagerTransferFinishedConfig = z.infer<
  typeof configValidator
>

export const mcFilesManagerTransferFinished = {
  key: "mc-files-manager-transfer-finished",
  dataValidator,
  configValidator,
} as const
