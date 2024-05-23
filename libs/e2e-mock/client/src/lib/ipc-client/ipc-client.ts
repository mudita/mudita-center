/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import ipc from "node-ipc"

const SERVER_ID = "MC"

type clientEmiterType = (event: string, data: unknown) => void

let clientEmiter: clientEmiterType | undefined = undefined

ipc.config.id = "E2E"
ipc.config.retry = 1000

export const connect = () => {
  ipc.connectTo(SERVER_ID, function () {
    const client = ipc.of.MC.on("connect", function () {})
    clientEmiter = client.emit.bind(client)
    ipc.of.MC.on("disconnect", function () {
      console.log("e2e client disconnect")
      clientEmiter = undefined
    })
  })
}

export const disconnect = () => {
  clientEmiter = undefined
  ipc.disconnect(SERVER_ID)
}

export default clientEmiter
