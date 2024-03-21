/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { EnvironmentConfig } from "Core/feature-flags/types"
import { Environment, Feature } from "Core/feature-flags/constants"

const loggerEnabled = process.env.DEV_DEVICE_LOGGER_ENABLED !== "0"

export const features: EnvironmentConfig = {
  [Feature.LoggerEnabled]: {
    [Environment.Development]: loggerEnabled,
    [Environment.Production]: loggerEnabled,
    [Environment.AlphaProduction]: loggerEnabled,
  },
  [Feature.LogsScrubbingEnabled]: {
    [Environment.Development]: false,
    [Environment.Production]: true,
    [Environment.AlphaProduction]: true,
  },
  [Feature.DeveloperModeEnabled]: {
    [Environment.Development]: true,
    [Environment.Production]: false,
    [Environment.AlphaProduction]: true,
  },
  [Feature.AlphaRelaseWarning]: {
    [Environment.Development]: false,
    [Environment.Production]: false,
    [Environment.AlphaProduction]: true,
  },
  [Feature.ForceUpdate]: {
    [Environment.Development]: false,
    [Environment.Production]: true,
    [Environment.AlphaProduction]: false,
  },
}
