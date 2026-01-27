/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { z } from "zod"
import { MCLangValidator } from "../api-config/api-config"
import { McOverviewConfigResponseValidator } from "./mc-overview-config"
import { McFileManagerConfigResponseValidator } from "./mc-file-manager-config"

export const FeatureConfigRequestValidator = z.object({
  lang: MCLangValidator,
  feature: z.string().min(1),
})

export type FeatureConfigRequest = z.infer<typeof FeatureConfigRequestValidator>

const CommonFeatureConfigResponseValidator = z.union([
  z.object({
    main: z.object({
      screenTitle: z.string(),
      component: z.union([
        z.literal("mc-contacts-view"),
        z.literal("mc-contacts-duplicates-view"),
      ]),
      config: z.object({
        entityTypes: z.array(z.string()),
      }),
    }),
  }),
])

export const FeatureConfigResponseValidator = z.union([
  McFileManagerConfigResponseValidator,
  McOverviewConfigResponseValidator,
  CommonFeatureConfigResponseValidator,
])

export type ApiFeatureConfigResponse = z.output<
  typeof FeatureConfigResponseValidator
>

export type CommonFeatureConfigResponse = z.output<
  typeof CommonFeatureConfigResponseValidator
>

export const buildFeatureConfigRequest = (req: FeatureConfigRequest) => {
  return {
    endpoint: "FEATURE_CONFIGURATION",
    method: "GET",
    body: req,
  } as const
}
