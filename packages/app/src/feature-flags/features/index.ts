/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { EnvironmentConfig } from "App/feature-flags/types"
import { Feature, Environment } from "App/feature-flags/constants"

export const features: EnvironmentConfig = {
  [Feature.LoggerEnabled]: {
    [Environment.Development]: true,
    [Environment.Production]: true,
    [Environment.TestProduction]: true,
    [Environment.AlphaProduction]: true,
    [Environment.TestAlphaProduction]: true,
  },
  [Feature.LogsScrubbed]: {
    [Environment.Development]: false,
    [Environment.Production]: true,
    [Environment.TestProduction]: false,
    [Environment.AlphaProduction]: true,
    [Environment.TestAlphaProduction]: false,
  },
  [Feature.DeveloperModeHidden]: {
    [Environment.Development]: false,
    [Environment.Production]: true,
    [Environment.TestProduction]: false,
    [Environment.AlphaProduction]: true,
    [Environment.TestAlphaProduction]: false,
  },
  [Feature.DisabledOnProduction]: {
    [Environment.Development]: false,
    [Environment.Production]: true,
    [Environment.TestProduction]: false,
    [Environment.AlphaProduction]: true,
    [Environment.TestAlphaProduction]: false,
  },
}
