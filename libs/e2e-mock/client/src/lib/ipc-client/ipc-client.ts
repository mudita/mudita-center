/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import ipc from "node-ipc"

type clientEmiterType = (event: string, data: unknown) => void

let clientEmiter: clientEmiterType | undefined = undefined

ipc.config.id = "E2E"
ipc.config.retry = 1000

ipc.connectTo("MC", function () {
  const client = ipc.of.MC.on("connect", function () {
    ipc.log("## connected to world ##", "delay" in ipc.config)
    ipc.of.MC.emit("app.message", {
      message: "hello",
    })
  })
  clientEmiter = client.emit.bind(client)
  ipc.of.MC.on("disconnect", function () {
    ipc.log("disconnected from MC")
    clientEmiter = undefined
  })
})

export default clientEmiter
