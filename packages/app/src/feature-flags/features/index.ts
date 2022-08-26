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
  [Feature.MessagesSearchEnabled]: {
    [Environment.Development]: true,
    [Environment.Production]: false,
    [Environment.AlphaProduction]: false,
  },
  [Feature.MessagesDeleteEnabled]: {
    [Environment.Development]: true,
    [Environment.Production]: true,
    [Environment.AlphaProduction]: true,
  },
  [Feature.MessagesForwardEnabled]: {
    [Environment.Development]: true,
    [Environment.Production]: false,
    [Environment.AlphaProduction]: false,
  },
  [Feature.MessagesResendEnabled]: {
    [Environment.Development]: true,
    [Environment.Production]: true,
    [Environment.AlphaProduction]: true,
  },
  [Feature.MessagesThreadDeleteEnabled]: {
    [Environment.Development]: true,
    [Environment.Production]: true,
    [Environment.AlphaProduction]: true,
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
  [Feature.FilesManagerEnabled]: {
    [Environment.Development]: true,
    [Environment.Production]: false,
    [Environment.AlphaProduction]: true,
  },
  [Feature.FilesManagerActionsEnabled]: {
    [Environment.Development]: true,
    [Environment.Production]: false,
    [Environment.AlphaProduction]: true,
  },
  [Feature.MessagesTemplatesTabEnabled]: {
    [Environment.Development]: true,
    [Environment.Production]: true,
    [Environment.AlphaProduction]: true,
  },
  [Feature.MuditaCenterPrereleaseEnabled]: {
    [Environment.Development]: true,
    [Environment.Production]: false,
    [Environment.AlphaProduction]: true,
  },
  [Feature.MessagesThreadAttachContactEnabled]: {
    [Environment.Development]: true,
    [Environment.Production]: true,
    [Environment.AlphaProduction]: true,
  },
  [Feature.MessagesThreadAttachTemplateEnabled]: {
    [Environment.Development]: true,
    [Environment.Production]: true,
    [Environment.AlphaProduction]: true,
  },
  [Feature.MessagesThreadCallsEnabled]: {
    [Environment.Development]: true,
    [Environment.Production]: false,
    [Environment.AlphaProduction]: false,
  },
  [Feature.MessagesThreadDetailsMarkAsReadEnabled]: {
    [Environment.Development]: true,
    [Environment.Production]: true,
    [Environment.AlphaProduction]: true,
  },
  [Feature.MessagesCallFromThreadEnabled]: {
    [Environment.Development]: true,
    [Environment.Production]: false,
    [Environment.AlphaProduction]: false,
  },
  [Feature.MessagesThreadBrowseContacts]: {
    [Environment.Development]: true,
    [Environment.Production]: true,
    [Environment.AlphaProduction]: true,
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
  [Feature.ReadAndUnreadMessages]: {
    [Environment.Development]: true,
    [Environment.Production]: true,
    [Environment.AlphaProduction]: true,
  },
  [Feature.OrderTemplate]: {
    [Environment.Development]: true,
    [Environment.Production]: false,
    [Environment.AlphaProduction]: false,
  },
  [Feature.AlphaRelaseWarning]: {
    [Environment.Development]: false,
    [Environment.Production]: false,
    [Environment.AlphaProduction]: true,
  },
}
