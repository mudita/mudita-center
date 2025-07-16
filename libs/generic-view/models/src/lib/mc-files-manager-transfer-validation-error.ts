/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { z } from "zod"

const dataValidator = z.object({
  fileList: z.array(z.string()),
})

export type McFilesManagerTransferValidationErrorData = z.infer<
  typeof dataValidator
>

const configValidator = z.object({
  modalKey: z.string(),
  fileTransferActionId: z.string(),
  actionType: z.string(),
})

export type McFilesManagerTransferValidationErrorConfig = z.infer<
  typeof configValidator
>

export const mcFilesManagerTransferValidationError = {
  key: "mc-files-manager-transfer-validation-error",
  dataValidator,
  configValidator,
} as const
