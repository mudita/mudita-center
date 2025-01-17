/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { z } from "zod"
import { buttonActionsValidator } from "./common-validators"

const dataValidator = z.object({
  freeSpace: z.number(),
})

export type McFilesManagerUploadFinishedData = z.infer<typeof dataValidator>

const configValidator = z.object({
  modalKey: z.string().optional(),
  uploadActionId: z.string().optional(),
  actions: buttonActionsValidator.optional(),
})

export type McFilesManagerUploadFinishedConfig = z.infer<typeof configValidator>

export const mcFilesManagerUploadFinished = {
  key: "mc-files-manager-upload-finished",
  dataValidator,
  configValidator,
} as const
