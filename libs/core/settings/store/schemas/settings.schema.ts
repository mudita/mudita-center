/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import path from "path"
import { Schema } from "electron-store"
import getMAC from "getmac"
import getAppPath from "Core/__deprecated__/main/utils/get-app-path"
import { Settings } from "Core/settings/dto"
import { ConversionFormat, Convert } from "Core/settings/constants"
import translationConfig from "App/translations.config.json"

const generateApplicationId = (): string | null => {
  const maxApplicationIdLength = 16

  const mac = getMACOrNull()
  if (mac !== null) {
    const uniqueValue = mac.replace(/:/g, "").slice(-maxApplicationIdLength)
    const padLength = maxApplicationIdLength - uniqueValue.length
    const pad = Math.random().toString(16).slice(-padLength)
    return `${pad}${uniqueValue}`
  } else {
    return null
  }
}

const getMACOrNull = (): string | null => {
  try {
    return getMAC()
  } catch (ex) {
    return null
  }
}

export const settingsSchema: Schema<Settings> = {
  applicationId: {
    type: ["string", "null"],
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
    default: path.join(getAppPath(), "os", "downloads"),
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
  privacyPolicyAccepted: {
    type: "boolean",
    default: false,
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
