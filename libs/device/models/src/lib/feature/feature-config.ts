/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { z } from "zod"
import componentValidators from "generic-view/models"
import { ComponentPropsByName } from "generic-view/utils"

const validators = Object.values(componentValidators).map(
  ({ key, configValidator }) => {
    return z
      .object({
        component: z.literal(key),
        config: configValidator,
      })
      .passthrough()
  }
) as unknown as [z.ZodTypeAny, z.ZodTypeAny, ...z.ZodTypeAny[]]

export const featureConfigValidator = z.record(
  z.string().min(1),
  z.union(validators)
)

export type FeatureConfig = Record<string, ComponentPropsByName>
