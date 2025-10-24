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

export const FeatureConfigResponseValidator = z.union([
  McFileManagerConfigResponseValidator,
  McOverviewConfigResponseValidator,
  // Add validators for other features
])

export type ApiFeatureConfigResponse = z.output<
  typeof FeatureConfigResponseValidator
>
