/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { z } from "zod"

export const HarmonyPreSendFileRequestValidator = z.object({
  fileSize: z.int(),
  fileCrc32: z.string(),
  fileName: z.string(),
})

export const HarmonyPreSendFileResponseValidator = z.object({
  txID: z.int(),
  chunkSize: z.int(),
})

export type HarmonyPreSendFileResponse = z.infer<
  typeof HarmonyPreSendFileResponseValidator
>

export const HarmonySendFileChunkRequestValidator = z.object({
  txID: z.int(),
  chunkNo: z.int(),
  data: z.base64(),
})

export const HarmonySendFileChunkResponseValidator = z.object({
  txID: z.int(),
  chunkNo: z.int(),
})
