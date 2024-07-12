/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import ipc from "node-ipc"
import logger from "Core/__deprecated__/main/utils/logger"
import {
  addKompaktResponseValidator,
  addKompaktValidator,
} from "./mock-descriptor/mock-descriptor-validators"
import { mockDescriptor } from "./mock-descriptor/mock-descriptor"
import {
  mockUpdaterStateService,
  UpdateState,
} from "./mock-updater-state.service"
import {
  MockHttpResponse,
  mockHttpStateService,
} from "./mock-http-state.service"

ipc.config.id = "MC"
ipc.config.retry = 15

const instanceID = Math.floor(Math.random() * 10000)

ipc.serve(function () {
  ipc.server.on("mock.add.device", function (data, socket) {
    logger.info(`mock.add.device fro instanceID: ${instanceID}`)
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
  ipc.server.on("mock.response.once", function (data, socket) {
    const params = addKompaktResponseValidator.safeParse(data)
    if (params.success) {
      mockDescriptor.addResponseOnce(params.data)
    }
  })
  ipc.server.on("server.stop", function (data, socket) {
    stopServer()
  })
  ipc.server.on("set.mock.update.state", function (data: UpdateState) {
    mockUpdaterStateService.updateState = data
  })
  ipc.server.on("mock.http.response", function (data: MockHttpResponse) {
    mockHttpStateService.mockHttpResponse(data)
  })
})

export function startServer() {
  ipc.server.start()
}

export function stopServer() {
  ipc.server.stop()
}

export const mockServiceEnabled = process.env.MOCK_SERVICE_ENABLED === "1"
