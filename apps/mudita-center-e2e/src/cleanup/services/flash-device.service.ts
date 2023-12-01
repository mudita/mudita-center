/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { FlashDeviceCommandClass } from "../commands"
import { FlashDeviceServiceClass } from "./flash-device-service.class"

export class FlashDeviceService implements FlashDeviceServiceClass {
  constructor(private flashDeviceCommand: FlashDeviceCommandClass) {}

  public async flashDevice(imagePath: string): Promise<void> {
    await this.flashDeviceCommand.exec(imagePath)
  }
}
