/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/LICENSE.md
 */

import { Schema } from "electron-store"
import {
  ConversionFormat,
  Convert,
} from "Renderer/components/rest/settings/audio-conversion-radio-group.enum"
import { app } from "electron"
import { name } from "../../../package.json"
import { AppSettings } from "App/main/store/settings.interface"
import { defaultLanguage } from "App/translations.config.json"

const settingsSchema: Schema<AppSettings> = {
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
    default: `${app.getPath("appData")}/${name}/pure/phone/backups/`,
  },
  pureOsDownloadLocation: {
    type: "string",
    default: `${app.getPath("appData")}/${name}/pure/os/downloads/`,
  },
  language: {
    type: "string",
    default: defaultLanguage,
  },
  pureNeverConnected: {
    type: "boolean",
    default: true,
  },
}

export default settingsSchema
