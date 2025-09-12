/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { z } from "zod"

export enum HarmonyDirectory {
  Relaxation = "/user/media/app/relaxation",
  Alarm = "/user/media/app/alarm",
}

export const HarmonyFileSchema = z.object({
  path: z.string(),
  fileSize: z.number(),
})

export type HarmonyFile = z.infer<typeof HarmonyFileSchema>

export const HarmonyGetFileListRequestValidator = z.object({
  listDir: z.string(),
})

export const HarmonyGetFileListResponseValidator = z.record(
  z.string(),
  z.array(HarmonyFileSchema)
)
