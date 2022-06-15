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
    [Environment.AlphaProduction]: true,
  },
  [Feature.LogsScrubbed]: {
    [Environment.Development]: false,
    [Environment.Production]: true,
    [Environment.AlphaProduction]: true,
  },
  [Feature.DeveloperModeHidden]: {
    [Environment.Development]: false,
    [Environment.Production]: true,
    [Environment.AlphaProduction]: false,
  },
  [Feature.DisabledOnProduction]: {
    [Environment.Development]: false,
    [Environment.Production]: true,
    [Environment.AlphaProduction]: false,
  },
  [Feature.McPrereleaseAvailable]: {
    [Environment.Development]: true,
    [Environment.Production]: false,
    [Environment.AlphaProduction]: true,
  },
  [Feature.DevelopOnly]: {
    [Environment.Development]: true,
    [Environment.Production]: false,
    [Environment.AlphaProduction]: false,
  },
  [Feature.ProductionAndAlpha]: {
    [Environment.Development]: false,
    [Environment.Production]: true,
    [Environment.AlphaProduction]: true,
  },
  [Feature.MessagesSearch]: {
    [Environment.Development]: true,
    [Environment.Production]: false,
    [Environment.AlphaProduction]: false,
  },
  [Feature.ProductionReleaseOnly]: {
    [Environment.Development]: false,
    [Environment.Production]: true,
    [Environment.AlphaProduction]: false,
  },
  [Feature.TestProductionReleaseOnly]: {
    [Environment.Development]: false,
    [Environment.Production]: false,
    [Environment.AlphaProduction]: true,
  },
  [Feature.AllReleaseListAvailable]: {
    [Environment.Development]: true,
    [Environment.Production]: false,
    [Environment.AlphaProduction]: false,
  },
}
