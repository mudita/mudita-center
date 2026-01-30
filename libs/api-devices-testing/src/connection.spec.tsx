/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { AppSerialPortService } from "app-serialport/main"

describe("Connection", () => {
  it.each([{ vendorId: "3310", productId: "200a" }])(
    "should connect successfully",
    async ({ vendorId, productId }) => {
      const service = new AppSerialPortService()
      expect(service.getCurrentDevices()).toHaveLength(0)

      await service.init()

      const device = service.getCurrentDevices().find((port) => {
        return (
          port.vendorId?.toLowerCase() === vendorId.toLowerCase() &&
          port.productId?.toLowerCase() === productId.toLowerCase()
        )
      })

      expect(device).toBeTruthy()
      if (device === undefined) {
        return
      }

      await service.reset(device.id, { rescan: false })
    }
  )
})
