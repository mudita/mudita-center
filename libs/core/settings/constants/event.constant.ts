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
  ToggleUpdateAvailable = "settings_toggle-update-available",
  TogglePrivacyPolicyAccepted = "settings_toggle-privacy-policy-accepted",
  CheckUpdateAvailable = "settings_check-update-available",
  SendDiagnosticData = "settings_send-diagnostic-data",
  SetCheckingForUpdate = "settings_set-checking-for-update",
  SetCheckingForUpdateFailed = "settings_set-checking-for-update-failed",
  SkipAvailableUpdate = "settings_skip-available-update",
  SetUSBAccessRestartRequired = "settings_set-usb-access-restart-required",
  SetUserHasSerialPortAccess = "settings_set-user-has-serial-port-access",
}
