/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import ipc from "node-ipc"
import {
  addKompaktResponseValidator,
  addKompaktValidator,
} from "./mock-descriptor/mock-descriptor-validators"
import { mockDescriptor } from "./mock-descriptor/mock-descriptor"

ipc.config.id = "MC"
ipc.config.retry = 1500

ipc.serve(function () {
  ipc.server.on("mock.add.device", function (data, socket) {
    const params = addKompaktValidator.safeParse(data)
    if (params.success) {
      mockDescriptor.addKompakt(params.data)
    }
  })
  ipc.server.on("mock.remove.device", function (data, socket) {
    if (typeof data === "string") {
      mockDescriptor.removeDevice(data)
    }
  })
  ipc.server.on("mock.response.every", function (data, socket) {
    const params = addKompaktResponseValidator.safeParse(data)
    if (params.success) {
      mockDescriptor.addResponse(params.data)
    }
  })
})

export function startServer() {
  ipc.server.start()
}
