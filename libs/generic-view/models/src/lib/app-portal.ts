/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { z } from "zod"

const dataValidator = z.undefined()

const configValidator = z.object({
  portal: z.literal("app-header"),
})

export type AppPortalConfig = z.infer<typeof configValidator>

export const appPortal = {
  key: "app-portal",
  dataValidator,
  configValidator,
} as const
