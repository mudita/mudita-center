/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

export class UsbDeviceService {
  async getObjectHandles(): Promise<string[]> {
    return ["1", "2"]
  }
}
