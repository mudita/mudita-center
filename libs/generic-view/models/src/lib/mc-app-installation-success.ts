/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { z } from "zod"

const dataValidator = z.undefined()

const configValidator = z.object({
  modalKey: z.string(),
})

export type AppInstallationSuccessConfig = z.infer<typeof configValidator>

export const mcAppInstallationSuccess = {
  key: "mc-app-installation-success",
  dataValidator,
  configValidator,
} as const
