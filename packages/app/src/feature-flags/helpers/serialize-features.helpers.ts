/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { EnvironmentConfig, Criteria } from "App/feature-flags/types"
import { Feature, Environment } from "App/feature-flags/constants"

const getFeatureToggleEnvironment = (): Environment =>
  process.env.FEATURE_TOGGLE_ENVIRONMENT as Environment || Environment.Development

export const serializeFeature = (features: EnvironmentConfig) => {
  return (Object.keys(features) as (keyof EnvironmentConfig)[]).reduce(
    (accum, value) => {
      accum[value] = {
        criteria: [
          {
            always:
              features[value][
                getFeatureToggleEnvironment()
              ],
          },
        ],
      }

      return accum
    },
    {} as Record<Feature, { criteria: Criteria[] }>
  )
}
