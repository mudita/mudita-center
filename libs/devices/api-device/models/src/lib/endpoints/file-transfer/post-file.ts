/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { z } from "zod"

const transferIdScheme = z.int().positive()
const sizeScheme = z.int().positive()
const chunkNumberScheme = z.int().min(1)

// POST PRE_FILE_TRANSFER
export const PreFileTransferPostRequestValidator = z.object({
  filePath: z.string().min(1),
  fileSize: sizeScheme,
  crc32: z.string().length(8),
})

export const PreFileTransferPostResponseValidator = z.object({
  transferId: transferIdScheme,
  chunkSize: sizeScheme,
})

export type PreFileTransferPostRequest = z.infer<typeof PreFileTransferPostRequestValidator>

// POST FILE_TRANSFER
export const FileTransferPostRequestValidator = z.object({
  transferId: transferIdScheme,
  chunkNumber: chunkNumberScheme,
  data: z.string().min(1),
})

export const FileTransferPostResponseValidator = z.object({
  transferId: transferIdScheme,
  chunkNumber: chunkNumberScheme,
})

export type FileTransferPostRequest = z.infer<typeof FileTransferPostRequestValidator>