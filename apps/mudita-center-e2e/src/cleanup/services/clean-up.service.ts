/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { FlashDeviceServiceClass } from "./flash-device-service.class"
import { ReleaseServiceClass } from "./release-service.class"
import { CleanUpServiceClass } from "./clean-up-service.class"
import { sleep } from "../../helpers"
import { DeviceServiceClass } from "../../device/services"

export class CleanUpService implements CleanUpServiceClass {
  constructor(
    private deviceService: DeviceServiceClass,
    private flashDeviceService: FlashDeviceServiceClass,
    private releaseService: ReleaseServiceClass
  ) {}

  public async cleanUpDevice(): Promise<void> {
    try {
      const imageUrl = await this.releaseService.downloadImage()

      await sleep(5000)

      await this.deviceService.startInMSC()

      await sleep(10000)

      await this.flashDeviceService.flashDevice(imageUrl)
    } catch (error) {
      console.log(error)
    }
  }
}
