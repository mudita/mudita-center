/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { z } from "zod"

const dataValidator = z.undefined()

const configValidator = z.object({
  progressModalKey: z.string(),
  completeModalKey: z.string(),
})

export type AppInstallationProgressConfig = z.infer<typeof configValidator>

export const mcAppInstallationProgress = {
  key: "mc-app-installation-progress",
  dataValidator,
  configValidator,
} as const
