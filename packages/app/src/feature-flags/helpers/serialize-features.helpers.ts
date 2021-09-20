/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { EnvironmentConfig, Criteria } from "../types"
import { Feature, Environment } from "../constants"

const getFeatureToggleEnvironment = () =>
  process.env.FEATURE_TOGGLE_ENVIRONMENT || Environment.Development

export const serializeFeature = (features: EnvironmentConfig) => {
  return Object.keys(features).reduce(
    (accum: Record<string, { criteria: Criteria[] }>, value: string) => {
      accum[value] = {
        criteria: [
          {
            always:
              features[value as Feature][
                getFeatureToggleEnvironment() as Environment
              ],
          },
        ],
      }

      return accum
    },
    {}
  )
}
