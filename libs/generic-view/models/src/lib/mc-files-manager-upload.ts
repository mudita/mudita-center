/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { z } from "zod"

const dataValidator = z.undefined()

const configValidator = z.object({
  buttonText: z.string(),
  storagePath: z.string(),
  directoryPath: z.string(),
  entitiesType: z.string(),
  fileTypes: z.array(z.string()),
  fileTypeGroupName: z.string(),
  multiple: z.boolean().optional(),
})

export type McFilesManagerUploadConfig = z.infer<typeof configValidator>

export const mcFilesManagerUpload = {
  key: "mc-files-manager-upload",
  dataValidator,
  configValidator,
} as const
