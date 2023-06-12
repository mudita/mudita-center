/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { PortInfo } from "serialport"
import { MainProcessIpc } from "electron-better-ipc"
import { EventEmitter } from "events"
import {
  MuditaPureDescriptor,
  MuditaHarmonyDescriptor,
  MuditaKompaktDescriptor,
} from "App/device/descriptors"
import { Device } from "App/device/modules/device"
import { DeviceFactory } from "App/device/factories"

export class DeviceResolverService {
  private eligibleDevices = [
    MuditaPureDescriptor,
    MuditaHarmonyDescriptor,
    MuditaKompaktDescriptor,
  ]

  constructor(
    private ipc: MainProcessIpc,
    private eventEmitter: EventEmitter
  ) {}

  public resolve(
    portInfo: Pick<PortInfo, "productId">,
    path: string
  ): Device | undefined {
    const id = portInfo.productId?.toLowerCase() ?? ""
    const descriptor = this.eligibleDevices.find((device) =>
      device.productIds
        .map((item) => item.toString().toLowerCase())
        .includes(id)
    )

    if (!descriptor) {
      return
    }

    return DeviceFactory.create(
      path,
      descriptor.deviceType,
      descriptor.adapter,
      descriptor.strategy,
      this.ipc,
      this.eventEmitter
    )
  }
}
