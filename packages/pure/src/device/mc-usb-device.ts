/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { McUsbFileType, McUsbDevice } from "./device.types"

export const timeoutMs = 30000

class BaseMcUsbDevice implements McUsbDevice {
  getFiles() {
    return Promise.resolve([
      {
        id: "1",
        size: 1234,
        name: "example_file_name",
        type: McUsbFileType.mp3,
      },
      {
        id: "2",
        size: 12345,
        name: "second_example_file_name",
        type: McUsbFileType.wav,
      },
    ])
  }
}

export default BaseMcUsbDevice
