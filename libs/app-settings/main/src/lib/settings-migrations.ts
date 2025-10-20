/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import path from "path"
import { app } from "electron"
import fs from "fs-extra"
import logger from "electron-log/main"
import { merge } from "lodash"
import { Migrations } from "app-utils/models"
import { generateAnalyticsId } from "./generate-application-id"

export const settingsMigrations: Migrations = {
  // App settings initialization and optional migration for legacy Mudita Center app (pre 4.0.0)
  "4.0.0": () => {
    const initialSettings = {
      version: app.getVersion(),
      user: {
        privacyPolicyAccepted: false,
        backupLocation: path.join(app.getPath("userData"), "backups"),
      },
      system: {
        analyticsId: generateAnalyticsId(),
        restartRequiredForSerialPortAccess: false,
      },
    }

    logger.log("[App settings migration - 4.0.0]", "Moving legacy app data.")
    const legacyAppDir = path.join(
      app.getPath("appData"),
      "@mudita",
      "mudita-center-app"
    )
    if (!fs.existsSync(legacyAppDir) || process.env.NODE_ENV === "test") {
      logger.log(
        "[App settings migration - 4.0.0]",
        "No legacy app data found. Skipping migration and initializing default settings."
      )
      return initialSettings
    }

    logger.log(
      "[App settings migration - 4.0.0]",
      "Legacy app data found. Migrating..."
    )
    try {
      const previousSettings = fs.readJsonSync(
        path.join(legacyAppDir, "settings.json")
      )
      // Copy backups from legacy app
      fs.copySync(
        previousSettings?.osBackupLocation,
        initialSettings.user.backupLocation
      )

      // Migrate relevant settings
      return merge({}, initialSettings, {
        user: {
          ...(previousSettings.privacyPolicyAccepted !== undefined && {
            privacyPolicyAccepted: previousSettings.privacyPolicyAccepted,
          }),
        },
        system: {
          ...(previousSettings.applicationId && {
            analyticsId: previousSettings.applicationId,
          }),
        },
      })
    } catch (error) {
      logger.error(
        "[App settings migration - 4.0.0]",
        "Error during legacy app migration:",
        error
      )
      return initialSettings
    } finally {
      logger.log(
        "[App settings migration - 4.0.0]",
        "Legacy app migration finished."
      )
    }
  },
  // Example migration for future use
  // "4.1.0": (settings) => {
  //   logger.log("[App settings migration - 4.0.1]", "Updating privacy policy.")
  //   return merge({}, settings, {
  //     user: {
  //       privacyPolicyAccepted: false,
  //     },
  //   })
  // },
}
