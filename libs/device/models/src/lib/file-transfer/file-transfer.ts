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

export const PreTransferGet200Validator = z.object({
  transferId: z.number(),
  chunkSize: z.number().positive(),
  fileSize: z.number().positive(),
  crc32: z.string(),
})

export const PreTransferGet202Validator = z.object({
  transferId: z.number(),
  chunkSize: z.undefined(),
  fileSize: z.undefined(),
  crc32: z.undefined(),
})

export type PreTransferGet200 = z.infer<typeof PreTransferGet200Validator>
export type PreTransferGet202 = z.infer<typeof PreTransferGet202Validator>

export const TransferGetValidator = z.object({
  transferId: z.number(),
  chunkNumber: z.number().positive(),
  data: z.string().min(1),
})
