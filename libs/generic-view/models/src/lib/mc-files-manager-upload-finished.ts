/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { z } from "zod"

const dataValidator = z.undefined()

const configValidator = z.object({
  modalKey: z.string(),
  uploadActionId: z.string(),
})

export type McFilesManagerUploadFinishedConfig = z.infer<typeof configValidator>

export const mcFilesManagerUploadFinished = {
  key: "mc-files-manager-upload-finished",
  dataValidator,
  configValidator,
} as const
