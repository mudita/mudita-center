/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { z } from "zod"

export const StartAppInstallationValidator = z.object({
  installationId: z.number(),
})

export type StartAppInstallation = z.infer<typeof StartAppInstallationValidator>

export const GetAppInstallationProgressValidator = z.object({
  installationId: z.number(),
  progress: z.number(),
})

export type GetAppInstallationProgress = z.infer<
  typeof GetAppInstallationProgressValidator
>
