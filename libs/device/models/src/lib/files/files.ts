/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { z } from "zod"

export const PreTransferSendValidator = z.object({
  transferId: z.number(),
  chunkSize: z.number().positive(),
})

export type PreTransferSend = z.infer<typeof PreTransferSendValidator>

export const TransferSendValidator = z.object({
  transferId: z.number(),
  chunkNumber: z.number().positive(),
})

export type TransferSend = z.infer<typeof TransferSendValidator>
