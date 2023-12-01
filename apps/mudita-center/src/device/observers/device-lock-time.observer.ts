/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { EventEmitter } from "events"
import { MainProcessIpc } from "electron-better-ipc"
import { Observer } from "App/core/types"
import { DeviceServiceEvent } from "App/device/constants"
import { DeviceService } from "App/device/services"
import { DeviceIpcEvent } from "App/device/constants/device-ipc-event.constant"
import { PhoneLockTime } from "App/device/dto"

export const DeviceLockTimeIntervalTime = 15000

export class DeviceLockTimeObserver implements Observer {
  private invoked = false
  private disconnected = true
  private unlocked = false
  private previousValue: undefined | PhoneLockTime

  constructor(
    private ipc: MainProcessIpc,
    private eventEmitter: EventEmitter,
    private deviceService: DeviceService
  ) {}

  public observe(): void {
    this.registerListener()
  }

  private registerListener(): void {
    this.eventEmitter.on(DeviceServiceEvent.DeviceLocked, () => {
      this.disconnected = false
      this.unlocked = false

      if (this.invoked) {
        return
      }

      this.invoked = true
      void this.watchDeviceLockTime()
    })

    this.eventEmitter.on(DeviceServiceEvent.DeviceDisconnected, () => {
      this.invoked = false
      this.disconnected = true
      this.unlocked = false
    })

    this.eventEmitter.on(DeviceServiceEvent.DeviceUnlocked, () => {
      this.invoked = false
      this.unlocked = true
    })
  }

  private async watchDeviceLockTime(): Promise<void> {
    if (this.disconnected || this.unlocked) {
      return
    }

    const data = await this.deviceService.unlockTime()
    const value = data.ok ? data.data : undefined

    if (this.previousValue !== value) {
      this.ipc.sendToRenderers(DeviceIpcEvent.DeviceLockTimeUpdated, value)
    }

    this.previousValue = value

    return new Promise((resolve) => {
      setTimeout(() => {
        void (async () => {
          resolve(await this.watchDeviceLockTime())
        })()
      }, DeviceLockTimeIntervalTime)
    })
  }
}
