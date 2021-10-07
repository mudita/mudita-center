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
    [Environment.AlphaProduction]: false,
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
    [Environment.TestProduction]: true,
    [Environment.AlphaProduction]: false,
    [Environment.TestAlphaProduction]: false,
  },
  [Feature.OsProductionReleaseAvaible]: {
    [Environment.Development]: true,
    [Environment.Production]: true,
    [Environment.TestProduction]: false,
    [Environment.AlphaProduction]: false,
    [Environment.TestAlphaProduction]: false,
  },
  [Feature.OsTestProductionReleaseAvaible]: {
    [Environment.Development]: true,
    [Environment.Production]: false,
    [Environment.TestProduction]: true,
    [Environment.AlphaProduction]: false,
    [Environment.TestAlphaProduction]: false,
  },
  [Feature.OsProductionAlphaReleaseAvaible]: {
    [Environment.Development]: true,
    [Environment.Production]: false,
    [Environment.TestProduction]: false,
    [Environment.AlphaProduction]: true,
    [Environment.TestAlphaProduction]: false,
  },
  [Feature.OsTestProductionAlphaAvaible]: {
    [Environment.Development]: true,
    [Environment.Production]: false,
    [Environment.TestProduction]: false,
    [Environment.AlphaProduction]: false,
    [Environment.TestAlphaProduction]: true,
  },
  [Feature.MessagesHidden]: {
    [Environment.Development]: false,
    [Environment.Production]: true,
    [Environment.TestProduction]: true,
    [Environment.AlphaProduction]: false,
    [Environment.TestAlphaProduction]: false,
  },
  [Feature.PhoneLockTimer]: {
    [Environment.Development]: true,
    [Environment.Production]: false,
    [Environment.TestProduction]: false,
    [Environment.AlphaProduction]: true,
    [Environment.TestAlphaProduction]: true,
  },
  [Feature.PhoneColour]: {
    [Environment.Development]: true,
    [Environment.Production]: false,
    [Environment.TestProduction]: false,
    [Environment.AlphaProduction]: true,
    [Environment.TestAlphaProduction]: true,
  },
  [Feature.PureSystem]: {
    [Environment.Development]: true,
    [Environment.Production]: false,
    [Environment.TestProduction]: false,
    [Environment.AlphaProduction]: true,
    [Environment.TestAlphaProduction]: true,
  },
  [Feature.MCVersion]: {
    [Environment.Development]: true,
    [Environment.Production]: false,
    [Environment.TestProduction]: false,
    [Environment.AlphaProduction]: true,
    [Environment.TestAlphaProduction]: true,
  },
  [Feature.DevelopOnly]: {
    [Environment.Development]: true,
    [Environment.Production]: false,
    [Environment.TestProduction]: false,
    [Environment.AlphaProduction]: false,
    [Environment.TestAlphaProduction]: false,
  },
  [Feature.ProductionAndAlpha]: {
    [Environment.Development]: false,
    [Environment.Production]: true,
    [Environment.TestProduction]: true,
    [Environment.AlphaProduction]: true,
    [Environment.TestAlphaProduction]: true,
  },
  [Feature.Backup]: {
    [Environment.Development]: true,
    [Environment.Production]: false,
    [Environment.TestProduction]: false,
    [Environment.AlphaProduction]: true,
    [Environment.TestAlphaProduction]: true,
  },
}
