/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import path from "path"
import { Schema } from "electron-store"
import getMAC from "getmac"
import getAppPath from "App/__deprecated__/main/utils/get-app-path"
import { Settings } from "App/settings/dto"
import { ConversionFormat, Convert } from "App/settings/constants"
import translationConfig from "App/translations.config.json"

const generateApplicationId = (): string => {
  const maxApplicationIdLength = 16
  const uniqueValue = getMAC().replace(/:/g, "").slice(-maxApplicationIdLength)
  const padLength = maxApplicationIdLength - uniqueValue.length
  const pad = Math.random().toString(16).slice(-padLength)
  return `${pad}${uniqueValue}`
}

export const settingsSchema: Schema<Settings> = {
  applicationId: {
    type: "string",
    default: generateApplicationId(),
  },
  autostart: {
    type: "boolean",
    default: false,
  },
  tethering: {
    type: "boolean",
    default: false,
  },
  incomingCalls: {
    type: "boolean",
    default: false,
  },
  incomingMessages: {
    type: "boolean",
    default: false,
  },
  lowBattery: {
    type: "boolean",
    default: false,
  },
  osUpdates: {
    type: "boolean",
    default: false,
  },
  nonStandardAudioFilesConversion: {
    type: "boolean",
    default: false,
  },
  convert: {
    type: "string",
    default: Convert.AlwaysAsk,
  },
  conversionFormat: {
    type: "string",
    default: ConversionFormat.WAV,
  },
  tray: {
    type: "boolean",
    default: false,
  },
  osBackupLocation: {
    type: "string",
    default: path.join(getAppPath(), "pure", "phone", "backups"),
  },
  osDownloadLocation: {
    type: "string",
    default: path.join(getAppPath(), "pure", "os", "downloads"),
  },
  language: {
    type: "string",
    default: translationConfig.defaultLanguage,
  },
  neverConnected: {
    type: "boolean",
    default: true,
  },
  collectingData: {
    type: "boolean",
    default: undefined,
  },
  diagnosticSentTimestamp: {
    type: "number",
    default: 0,
  },
  ignoredCrashDumps: {
    type: "array",
    default: [],
  },
}
