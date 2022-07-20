/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { DeviceAdapterClass, SerialPortAdapterClass } from "../adapters"
import { sleep } from "../helpers"
import { DeviceServiceClass } from "./device-service.class"

export class DeviceService implements DeviceServiceClass {
  constructor(
    private deviceAdapter: DeviceAdapterClass,
    private serialPortAdapter: SerialPortAdapterClass
  ) {}

  public async startInMSC(): Promise<void> {
    await sleep(2000)

    const muditaDevice = await this.deviceAdapter.getDeviceByDescription({
      vendorId: "3310",
      productId: "0100",
    })

    await sleep()

    await this.serialPortAdapter.request(muditaDevice, {
      endpoint: 2,
      method: 3,
      body: {
        rebootMode: "usbMscMode",
      },
    })

    await sleep()

    await this.deviceAdapter.getDeviceByDescription({
      vendorId: "3310",
      productId: "0103",
    })
  }
}
