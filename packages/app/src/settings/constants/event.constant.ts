/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

export enum SettingsEvent {
  LoadSettings = "LOAD_SETTINGS",
  SetLatestVersion = "SET_LATEST_VERSION",
  SetSettings = "SET_SETTINGS",
  SetDiagnosticTimestamp = "SET_DIAGNOSTIC_TIMESTAMP",
  SetOsBackupLocation = "SET_OS_BACKUP_LOCATION",
  SetConversionFormat = "SET_CONVERSION_FORMAT",
  SetConvert = "SET_CONVERT",
  SetNonStandardAudioFilesConversion = "SET_NON_STANDARD_AUDIO_FILES_CONVERSION",
  SetOsUpdates = "SET_OS_UPDATES",
  SetLowBattery = "SET_LOW_BATTERY",
  SetIncomingMessages = "SET_INCOMING_MESSAGES",
  SetIncomingCalls = "SET_INCOMING_CALLS",
  ToggleTethering = "TOGGLE_TETHERING",
  ToggleUpdateAvailable = "TOGGLE_UPDATE_AVAILABLE",
  ToggleCollectionData = "TOGGLE_COLLECTION_DATA",
  CheckUpdateAvailable = "CHECK_UPDATE_AVAILABLE",
  SendDiagnosticData = "SEND_DIAGNOSTIC_DATA",
}
