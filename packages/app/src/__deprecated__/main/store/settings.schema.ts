/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import path from "path"
import { Schema } from "electron-store"
import getMAC from "getmac"
import getAppPath from "App/__deprecated__/main/utils/get-app-path"
import {
  AppSettings,
  ConversionFormat,
  Convert,
} from "App/__deprecated__/main/store/settings.interface"
import translationConfig from "App/translations.config.json"

const generateApplicationId = (): string => {
  const maxApplicationIdLength = 16
  const uniqueValue = getMAC().replace(/:/g, "").slice(-maxApplicationIdLength)
  const padLength = maxApplicationIdLength - uniqueValue.length
  const pad = Math.random().toString(16).slice(-padLength)
  return `${pad}${uniqueValue}`
}

const settingsSchema: Schema<AppSettings> = {
  applicationId: {
    type: "string",
    default: generateApplicationId(),
  },
  appAutostart: {
    type: "boolean",
    default: false,
  },
  appTethering: {
    type: "boolean",
    default: false,
  },
  appIncomingCalls: {
    type: "boolean",
    default: false,
  },
  appIncomingMessages: {
    type: "boolean",
    default: false,
  },
  appLowBattery: {
    type: "boolean",
    default: false,
  },
  appOsUpdates: {
    type: "boolean",
    default: false,
  },
  appNonStandardAudioFilesConversion: {
    type: "boolean",
    default: false,
  },
  appConvert: {
    type: "string",
    default: Convert.AlwaysAsk,
  },
  appConversionFormat: {
    type: "string",
    default: ConversionFormat.WAV,
  },
  appTray: {
    type: "boolean",
    default: false,
  },
  pureOsBackupLocation: {
    type: "string",
    default: path.join(getAppPath(), "pure", "phone", "backups"),
  },
  pureOsDownloadLocation: {
    type: "string",
    default: path.join(getAppPath(), "pure", "os", "downloads"),
  },
  language: {
    type: "string",
    default: translationConfig.defaultLanguage,
  },
  pureNeverConnected: {
    type: "boolean",
    default: true,
  },
  appCollectingData: {
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

export default settingsSchema
