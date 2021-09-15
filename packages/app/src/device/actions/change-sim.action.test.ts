/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import createMockStore from "redux-mock-store"
import thunk from "redux-thunk"
import { AnyAction } from "@reduxjs/toolkit"
import { DeviceResponseStatus } from "Backend/adapters/device-response.interface"
import { SimCard } from "Renderer/models/basic-info/basic-info.typings"
import { changeSim } from "./change-sim.action"
import { DeviceEvent } from "App/device/constants"
import { DeviceChangeSimError } from "App/device/errors"
import changeSimRequest from "Renderer/requests/change-sim.request"

const mockStore = createMockStore([thunk])()

const simCardMock: SimCard = {
  network: "Network #1",
  networkLevel: 5,
  number: 1,
  slot: 1,
  active: true,
}

jest.mock("Renderer/requests/change-sim.request")

afterEach(() => {
  mockStore.clearActions()
})

describe("Change SimCard request returns `success` status", () => {
  test("fire async `changeSim` action and execute `SetSimData` event", async () => {
    ;(changeSimRequest as jest.Mock).mockReturnValueOnce({
      status: DeviceResponseStatus.Ok,
    })
    const {
      meta: { requestId },
    } = await mockStore.dispatch(changeSim(simCardMock) as unknown as AnyAction)

    expect(mockStore.getActions()).toEqual([
      changeSim.pending(requestId, simCardMock),
      {
        type: DeviceEvent.SetSimData,
        payload: 1,
      },
      changeSim.fulfilled(simCardMock, requestId, simCardMock),
    ])

    expect(changeSimRequest).toHaveBeenCalled()
  })
})

describe("Change SimCard request returns `error` status", () => {
  test("fire async `changeSim` action and execute `rejected` event", async () => {
    ;(changeSimRequest as jest.Mock).mockReturnValueOnce({
      status: DeviceResponseStatus.Error,
    })
    const errorMock = new DeviceChangeSimError("Cannot change sim card")
    const {
      meta: { requestId },
    } = await mockStore.dispatch(changeSim(simCardMock) as unknown as AnyAction)

    expect(mockStore.getActions()).toEqual([
      changeSim.pending(requestId, simCardMock),
      changeSim.rejected(
        "Rejected" as unknown as Error,
        requestId,
        simCardMock,
        errorMock
      ),
    ])
  })
})
