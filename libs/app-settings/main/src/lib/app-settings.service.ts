/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import path from "path"
import { app } from "electron"
import { AppSettings } from "app-settings/models"
import { JsonStoreService, MigrationService } from "app-utils/main"
import { migrations } from "./migrations"
import { DotNotation, NestedPartial } from "app-utils/models"
import { generateAnalyticsId } from "./generate-application-id"
import { delay } from "app-utils/common"

export class AppSettingsService {
  private jsonStore: JsonStoreService<AppSettings> | undefined
  private migrationService: MigrationService<AppSettings> | undefined

  constructor() {
    this.initSettings()
  }

  // get path() {
  //   await this.whiteUnitSettingInitialized()
  //   return this.jsonStore.path
  // }

  async get<P extends DotNotation<AppSettings>>(path?: P) {
    await this.whiteUnitSettingInitialized()
    console.log("this.jsonStore!.get(path)")
    console.log(this.jsonStore!.get())
    if (path) {
      return this.jsonStore!.get(path)
    }
    return this.jsonStore!.get()
  }

  async set(settings: NestedPartial<AppSettings>) {
    await this.whiteUnitSettingInitialized()
    return this.jsonStore!.set(settings)
  }

  private async initSettings() {
    await delay(2000)
    this.jsonStore = new JsonStoreService<AppSettings>("app-settings", {
      version: app.getVersion(),
      user: {
        privacyPolicyAccepted: false,
        backupLocation: path.join(app.getPath("userData"), "backups"),
      },
      system: {
        analyticsId: generateAnalyticsId(),
        restartRequiredForSerialPortAccess: false,
      },
    })
    const settings = this.jsonStore.get()
    this.migrationService = new MigrationService(
      migrations,
      settings,
      settings.version,
      app.getVersion()
    )
    const migratedData = this.migrationService.migrate()
    this.jsonStore.set(migratedData)
  }

  private async whiteUnitSettingInitialized(attempts = 0): Promise<boolean> {
    if (attempts > 10) {
      throw new Error(
        "Failed to initialize white unit settings after 10 attempts"
      )
    }
    if (this.jsonStore !== undefined && this.migrationService !== undefined) {
      return true
    } else {
      await delay(100)
      return this.whiteUnitSettingInitialized(++attempts)
    }
  }
}
