/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { z } from "zod"
import { MCLangValidator } from "../api-config/api-config"
import { McOverviewDataResponseValidator } from "./mc-overview-data"
import { McFileManagerDataResponseValidator } from "./mc-file-manager-data"

export const FeatureDataRequestValidator = z.object({
  lang: MCLangValidator,
  feature: z.string().min(1),
})

export const CommonFeatureDataResponseValidator = z.object({}).optional()

export const FeatureDataResponseValidator = z.union([
  McFileManagerDataResponseValidator,
  McOverviewDataResponseValidator,
  CommonFeatureDataResponseValidator,
])

export type ApiFeatureDataResponse = z.output<
  typeof FeatureDataResponseValidator
>

export type CommonFeatureDataResponse = z.output<
  typeof CommonFeatureDataResponseValidator
>
