/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { z } from "zod"

export const PreTransferSendValidator = z.object({
  transferId: z.number(),
  chunkSize: z.number().positive(),
})

export const TransferSendValidator = z.object({
  transferId: z.number(),
  chunkNumber: z.number().positive(),
})

export type TransferSend = z.infer<typeof TransferSendValidator>

export const PreTransferGetValidator = z.object({
  transferId: z.number(),
  chunkSize: z.number().positive(),
  fileSize: z.number().positive(),
  crc32: z.string(),
})

export type PreTransferGet = z.infer<typeof PreTransferGetValidator>

export const TransferGetValidator = z.object({
  transferId: z.number(),
  chunkNumber: z.number().positive(),
  data: z.string().min(1),
})
