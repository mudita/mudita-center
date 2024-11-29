/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { z } from "zod"
import componentValidators from "generic-view/models"
import { ComponentPropsByName } from "generic-view/utils"
import { layoutSchema } from "./layout-config"
import { dataProviderSchema } from "./data-provider-config"

const validators = Object.values(componentValidators).map(
  ({ key, configValidator }) => {
    return z
      .object({
        component: z.literal(key),
        config: configValidator,
        layout: layoutSchema.optional(),
        dataProvider: dataProviderSchema.optional(),
        dataProviderSecondary: dataProviderSchema.optional(),
        childrenKeys: z.array(z.string()).optional(),
      })
      .passthrough()
  }
) as unknown as [z.ZodTypeAny, z.ZodTypeAny, ...z.ZodTypeAny[]]

export const featureConfigValidator = z.record(
  z.string().min(1),
  z.union(validators)
)

export type FeatureConfig = Record<string, ComponentPropsByName>
