/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

export interface Settings {
  applicationId: string | null
  osBackupLocation: string
  osDownloadLocation: string
  language: string
  ignoredCrashDumps: string[]
  diagnosticSentTimestamp: number
  collectingData: boolean | undefined
  privacyPolicyAccepted: boolean | undefined
  neverConnected: boolean
  tray: boolean
  autostart: boolean
  tethering: boolean
  usbAccessRestartRequired: boolean
}
