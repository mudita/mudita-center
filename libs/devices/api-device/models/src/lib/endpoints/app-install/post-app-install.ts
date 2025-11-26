/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { z } from "zod"

export const AppInstallPostRequestValidator = z.object({
  filePath: z.string().min(1),
})

export type AppInstallPostRequest = z.input<
  typeof AppInstallPostRequestValidator
>

export const AppInstallPostResponseValidator = z.object({
  installationId: z.number(),
})

export type AppInstallPostResponse = z.infer<
  typeof AppInstallPostResponseValidator
>
