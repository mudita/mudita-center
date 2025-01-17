/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { z } from "zod"

const dataValidator = z.object({
  fileList: z.array(z.string()),
})

export type McFilesManagerUploadValidationErrorData = z.infer<
  typeof dataValidator
>

const configValidator = z.object({
  modalKey: z.string(),
  uploadActionId: z.string(),
})

export type McFilesManagerUploadValidationErrorConfig = z.infer<
  typeof configValidator
>

export const mcFilesManagerUploadValidationError = {
  key: "mc-files-manager-upload-validation-error",
  dataValidator,
  configValidator,
} as const
