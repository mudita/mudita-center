/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { ConversionFormat, Convert } from "App/settings/constants"

export interface Settings {
  applicationId: string
  conversionFormat: ConversionFormat
  convert: Convert
  osBackupLocation: string
  osDownloadLocation: string
  language: string
  ignoredCrashDumps: string[]
  diagnosticSentTimestamp: number
  collectingData: boolean | undefined
  neverConnected: boolean
  tray: boolean
  nonStandardAudioFilesConversion: boolean
  osUpdates: boolean
  lowBattery: boolean
  incomingCalls: boolean
  incomingMessages: boolean
  autostart: boolean
  tethering: boolean
}
