/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

export enum SettingsEvent {
  LoadSettings = "settings_load-settings",
  SetLatestVersion = "settings_set-latest-version",
  SetSettings = "settings_set-settings",
  SetSetting = "settings_set-setting",
  SetDiagnosticTimestamp = "settings_set-diagnostic-timestamp",
  SetOsBackupLocation = "settings_set-os-backup-location",
  SetConversionFormat = "settings_set-conversion-format",
  SetConvert = "settings_set-convert",
  SetNonStandardAudioFilesConversion = "settings_set-non-standard-audio-files-conversion",
  SetOsUpdates = "settings_set-os-updates",
  SetLowBattery = "settings_set-low-battery",
  SetIncomingMessages = "settings_set-incoming-messages",
  SetIncomingCalls = "settings_set-incoming-calls",
  ToggleTethering = "settings_toggle-tethering",
  ToggleUpdateAvailable = "settings_toggle-update-available",
  ToggleCollectionData = "settings_toggle-collection-data",
  TogglePrivacyPolicyAccepted = "settings_toggle-privacy-policy-accepted",
  CheckUpdateAvailable = "settings_check-update-available",
  SendDiagnosticData = "settings_send-diagnostic-data",
  DeleteCollectingData = "settings_delete-collecting-data",
  SetCheckingForUpdate = "settings_set-checking-for-update",
  SetCheckingForUpdateFailed = "settings_set-checking-for-update-failed",
  SkipAvailableUpdate = "settings_skip-available-update",
  SetUSBAccessRestartRequired = "settings_set-usb-access-restart-required",
}
