/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { Observer } from "App/core/types"
import {
  DeviceService,
  DeviceServiceEventName,
} from "App/backend/device-service"
import { AppSettingsService } from "App/app-settings/services"
import { CrashDumpService } from "App/crash-dump/services"
import { MainProcessIpc } from "electron-better-ipc"
import { IpcCrashDumpRenderedEvent } from "App/crash-dump/constants"

export class CrashDumpObserver implements Observer {
  private invoked = false
  private disconnected = true

  constructor(
    private ipc: MainProcessIpc,
    private deviceService: DeviceService,
    private crashDumpService: CrashDumpService,
    private settingsService: AppSettingsService
  ) {}

  public observe(): void {
    this.registerListener()
  }

  private registerListener(): void {
    this.deviceService.on(DeviceServiceEventName.DeviceUnlocked, async () => {
      this.disconnected = false

      if (this.invoked || this.disconnected) {
        return
      }

      this.invoked = true

      const crashDumps = await this.crashDumpService.getDeviceCrashDumpFiles()
      const settings = this.settingsService.getAppSettings()
      const crashDumpsIgnored = crashDumps.data?.every((file) =>
        settings.ignoredCrashDumps.includes(file)
      )

      if (crashDumps && !crashDumpsIgnored) {
        this.ipc.sendToRenderers(
          IpcCrashDumpRenderedEvent.CrashDumpExists,
          crashDumps.data
        )
      }
    })

    this.deviceService.on(
      DeviceServiceEventName.DeviceDisconnected,
      async () => {
        this.invoked = false
        this.disconnected = true
      }
    )
  }
}
