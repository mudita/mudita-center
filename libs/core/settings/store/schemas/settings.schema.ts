/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import path from "path"
import { Schema } from "electron-store"
import getAppPath from "Core/__deprecated__/main/utils/get-app-path"
import { Settings } from "Core/settings/dto"
import translationConfig from "App/translations.config.json"
import { generateApplicationId } from "Core/settings/store/schemas/generate-application-id"

export const settingsSchema: Schema<Settings> = {
  settingsSchemaVersion: {
    type: "number",
  },
  applicationId: {
    type: ["string", "null"],
    default: generateApplicationId(),
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
  privacyPolicyAccepted: {
    type: "boolean",
    default: true,
  },
  diagnosticSentTimestamp: {
    type: "number",
    default: 0,
  },
  ignoredCrashDumps: {
    type: "array",
    default: [],
  },
  usbAccessRestartRequired: {
    type: "boolean",
    default: false,
  },
}
