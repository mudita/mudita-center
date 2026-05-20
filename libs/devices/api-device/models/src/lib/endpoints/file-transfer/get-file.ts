/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { z } from "zod"

const transferIdScheme = z.int().positive()
const sizeScheme = z.int().positive()
const chunkNumberScheme = z.int().min(1)

// GET PRE_FILE_TRANSFER
export const PreFileTransferGetRequestValidator = z.object({
  filePath: z.string().min(1),
})

const PreFileTransferInProgressGetResponseValidator = z.object({
  transferId: transferIdScheme,
  chunkSize: z.undefined(),
  fileSize: z.undefined(),
  crc32: z.undefined(),
})

const PreFileTransferReadyGetResponseValidator = z.object({
  transferId: transferIdScheme,
  chunkSize: sizeScheme,
  fileSize: sizeScheme,
  crc32: z.string().length(8),
})

export const PreFileTransferGetResponseValidator = z.union([
  PreFileTransferInProgressGetResponseValidator,
  PreFileTransferReadyGetResponseValidator,
])

export type PreFileTransferGetRequest = z.input<
  typeof PreFileTransferGetRequestValidator
>
export type PreFileTransferInProgressGetResponse = z.infer<
  typeof PreFileTransferInProgressGetResponseValidator
>
export type PreFileTransferReadyGetResponse = z.infer<
  typeof PreFileTransferReadyGetResponseValidator
>

// GET FILE_TRANSFER
export const FileTransferGetRequestValidator = z.object({
  transferId: transferIdScheme,
  chunkNumber: chunkNumberScheme,
})

export const FileTransferGetResponseValidator = z.object({
  transferId: transferIdScheme,
  chunkNumber: chunkNumberScheme,
  data: z.string(),
})

export type FileTransferGetRequest = z.input<
  typeof FileTransferGetRequestValidator
>

export const buildPreFileTransferGetRequest = (
  req: PreFileTransferGetRequest
) => {
  return {
    endpoint: "PRE_FILE_TRANSFER",
    method: "GET",
    body: req,
  } as const
}
