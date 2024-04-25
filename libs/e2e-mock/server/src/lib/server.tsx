/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import ipc from "node-ipc"
import { addKompaktValidator } from "./mock-descriptor/mock-descriptor-validators"
import { mockDescriptor } from "./mock-descriptor/mock-descriptor"

ipc.config.id = "MC"
ipc.config.retry = 1500

ipc.serve(function () {
  ipc.server.on("app.message", function (data, socket) {
    ipc.server.emit(socket, "app.message", {
      //   id: ipc.config.id,
      message: data.message + " world!",
    })
  })
  ipc.server.on("mock.add.device", function (data, socket) {
    const params = addKompaktValidator.safeParse(data)
    console.log(data)
    if (params.success) {
      console.log(params.data)
      mockDescriptor.addKompakt(params.data)
    }
  })
})

export function startServer() {
  ipc.server.start()
}
