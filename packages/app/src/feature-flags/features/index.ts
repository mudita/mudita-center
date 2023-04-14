/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { EnvironmentConfig } from "App/feature-flags/types"
import { Feature, Environment } from "App/feature-flags/constants"

export const features: EnvironmentConfig = {
  [Feature.ProductionReleasesOnly]: {
    [Environment.Development]: false,
    [Environment.Production]: true,
    [Environment.AlphaProduction]: false,
  },
  [Feature.PreReleasesOnly]: {
    [Environment.Development]: false,
    [Environment.Production]: false,
    [Environment.AlphaProduction]: true,
  },
  [Feature.MessagesForwardEnabled]: {
    [Environment.Development]: true,
    [Environment.Production]: false,
    [Environment.AlphaProduction]: false,
  },
  [Feature.LoggerEnabled]: {
    [Environment.Development]: true,
    [Environment.Production]: true,
    [Environment.AlphaProduction]: true,
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
  [Feature.MuditaCenterPrereleaseEnabled]: {
    [Environment.Development]: true,
    [Environment.Production]: false,
    [Environment.AlphaProduction]: true,
  },
  [Feature.MessagesThreadCallsEnabled]: {
    [Environment.Development]: true,
    [Environment.Production]: false,
    [Environment.AlphaProduction]: false,
  },
  [Feature.MessagesCallFromThreadEnabled]: {
    [Environment.Development]: true,
    [Environment.Production]: false,
    [Environment.AlphaProduction]: false,
  },
  [Feature.MessagesDraftStatus]: {
    [Environment.Development]: true,
    [Environment.Production]: false,
    [Environment.AlphaProduction]: true,
  },
  [Feature.ContactForwardEnabled]: {
    [Environment.Development]: true,
    [Environment.Production]: false,
    [Environment.AlphaProduction]: false,
  },
  [Feature.ContactBlockingEnabled]: {
    [Environment.Development]: true,
    [Environment.Production]: false,
    [Environment.AlphaProduction]: false,
  },
  [Feature.ContactPhoneFieldIconsEnabled]: {
    [Environment.Development]: true,
    [Environment.Production]: false,
    [Environment.AlphaProduction]: false,
  },
  [Feature.ContactExportEnabled]: {
    [Environment.Development]: true,
    [Environment.Production]: false,
    [Environment.AlphaProduction]: false,
  },
  [Feature.TetheringEnabled]: {
    [Environment.Development]: true,
    [Environment.Production]: false,
    [Environment.AlphaProduction]: false,
  },
  [Feature.SettingsNotificationTabEnabled]: {
    [Environment.Development]: true,
    [Environment.Production]: false,
    [Environment.AlphaProduction]: false,
  },
  [Feature.SettingsAudioConversionTabEnabled]: {
    [Environment.Development]: true,
    [Environment.Production]: false,
    [Environment.AlphaProduction]: false,
  },
  [Feature.PhoneDialTabEnabled]: {
    [Environment.Development]: true,
    [Environment.Production]: false,
    [Environment.AlphaProduction]: false,
  },
  [Feature.PhoneTabEnabled]: {
    [Environment.Development]: true,
    [Environment.Production]: false,
    [Environment.AlphaProduction]: false,
  },
  [Feature.ToolsTabEnabled]: {
    [Environment.Development]: true,
    [Environment.Production]: false,
    [Environment.AlphaProduction]: false,
  },
  [Feature.MusicTabEnabled]: {
    [Environment.Development]: true,
    [Environment.Production]: false,
    [Environment.AlphaProduction]: false,
  },
  [Feature.CalendarTabEnabled]: {
    [Environment.Development]: true,
    [Environment.Production]: false,
    [Environment.AlphaProduction]: false,
  },
  [Feature.MeditationTabEnabled]: {
    [Environment.Development]: true,
    [Environment.Production]: false,
    [Environment.AlphaProduction]: false,
  },
  [Feature.RecoveryModeTabEnabled]: {
    [Environment.Development]: true,
    [Environment.Production]: false,
    [Environment.AlphaProduction]: false,
  },
  [Feature.YourPureIconsEnabled]: {
    [Environment.Development]: true,
    [Environment.Production]: false,
    [Environment.AlphaProduction]: false,
  },
  [Feature.OrderTemplate]: {
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
