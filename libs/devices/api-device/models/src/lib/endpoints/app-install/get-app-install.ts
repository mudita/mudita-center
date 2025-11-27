/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { z } from "zod"

export const AppInstallGetRequestValidator = z.object({
  installationId: z.number(),
})

export type AppInstallGetRequest = z.input<typeof AppInstallGetRequestValidator>

export const AppInstallGetResponseValidator = z.object({
  installationId: z.number(),
  progress: z.number(),
})

export type AppInstallGetResponse = z.infer<
  typeof AppInstallGetResponseValidator
>
