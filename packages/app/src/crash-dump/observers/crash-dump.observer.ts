/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { EventEmitter } from "events"
import { Observer } from "App/core/types"
import { DeviceServiceEvent } from "App/device/constants"
import { SettingsService } from "App/settings/services"
import { CrashDumpService } from "App/crash-dump/services"
import { MainProcessIpc } from "electron-better-ipc"
import { IpcCrashDumpRenderedEvent } from "App/crash-dump/constants"

export class CrashDumpObserver implements Observer {
  private invoked = false
  private disconnected = true

  constructor(
    private ipc: MainProcessIpc,
    private eventEmitter: EventEmitter,
    private crashDumpService: CrashDumpService,
    private settingsService: SettingsService
  ) {}

  public observe(): void {
    this.registerListener()
  }

  private registerListener(): void {
    // AUTO DISABLED - fix me if you like :)
    // eslint-disable-next-line @typescript-eslint/no-misused-promises
    this.eventEmitter.on(DeviceServiceEvent.DeviceUnlocked, async () => {
      this.disconnected = false

      if (this.invoked || this.disconnected) {
        return
      }

      this.invoked = true

      const crashDumps = await this.crashDumpService.getDeviceCrashDumpFiles()
      const settings = this.settingsService.getSettings()
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

    this.eventEmitter.on(
      DeviceServiceEvent.DeviceDisconnected,
      // AUTO DISABLED - fix me if you like :)
      // eslint-disable-next-line @typescript-eslint/no-misused-promises, @typescript-eslint/require-await
      async () => {
        this.invoked = false
        this.disconnected = true
      }
    )
  }
}
