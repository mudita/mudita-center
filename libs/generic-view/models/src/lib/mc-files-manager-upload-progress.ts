/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { z } from "zod"

const dataValidator = z.undefined()

const configValidator = z.object({
  storagePath: z.string(),
  directoryPath: z.string(),
  entitiesType: z.string(),
  uploadActionId: z.string(),
})

export type McFilesManagerUploadProgressConfig = z.infer<typeof configValidator>

export const mcFilesManagerUploadProgress = {
  key: "mc-files-manager-upload-progress",
  dataValidator,
  configValidator,
} as const
