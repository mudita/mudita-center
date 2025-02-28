/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { z } from "zod"

const dataValidator = z.undefined()

const configValidator = z.object({
  modalKey: z.string(),
})

export type AppInstallationErrorConfig = z.infer<typeof configValidator>

export const mcAppInstallationError = {
  key: "mc-app-installation-error",
  dataValidator,
  configValidator,
} as const
