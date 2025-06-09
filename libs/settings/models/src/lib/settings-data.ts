/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

export type SettingsData = {
  settingsSchemaVersion?: number
  applicationId: string | null
  osBackupLocation: string
  osDownloadLocation: string
  language: string
  ignoredCrashDumps: string[]
  diagnosticSentTimestamp: number
  privacyPolicyAccepted: boolean | undefined
  usbAccessRestartRequired: boolean
}
