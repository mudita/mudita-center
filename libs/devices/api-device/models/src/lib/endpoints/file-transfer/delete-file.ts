/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { z } from "zod"
import { emptyBodySchema } from "../common"

const transferIdScheme = z.int().positive()

export const FileTransferDeleteRequestValidator = z.object({
  fileTransferId: transferIdScheme,
})

export type FileTransferDeleteRequest = z.input<
  typeof FileTransferDeleteRequestValidator
>

export const FileTransferDeleteResponseValidator = emptyBodySchema

export type FileTransferDeleteResponse = z.infer<
  typeof FileTransferDeleteResponseValidator
>

export const buildFileTransferDeleteRequest = (
  req: FileTransferDeleteRequest
) => {
  return {
    endpoint: "FILE_TRANSFER",
    method: "DELETE",
    body: req,
  } as const
}
