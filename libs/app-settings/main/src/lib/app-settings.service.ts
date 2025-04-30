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
import logger from "electron-log"

export class AppSettingsService {
  private readonly jsonStore: JsonStoreService<AppSettings>
  private readonly migrationService: MigrationService<AppSettings>

  constructor() {
    this.jsonStore = new JsonStoreService<AppSettings>(
      "app-settings",
      this.initSettings()
    )
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

  private initSettings() {
    return {
      version: app.getVersion(),
      user: {
        privacyPolicyAccepted: false,
        backupLocation: path.join(app.getPath("userData"), "backups"),
      },
      system: {
        analyticsId: "",
      },
    }
  }

  get path() {
    return this.jsonStore.path
  }

  get<P extends DotNotation<AppSettings>>(path?: P) {
    if (path) {
      const data = this.jsonStore.get(path)
      logger.log("AppSettingsService get", path, data)
      return data
    }
    return this.jsonStore.get()
  }

  set(settings: NestedPartial<AppSettings>) {
    return this.jsonStore.set(settings)
  }
}
