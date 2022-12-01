/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { AnyAction } from "@reduxjs/toolkit"
import { AppError } from "App/core/errors"
import { RequestResponseStatus } from "App/core/types/request-response.interface"
import { DeviceError, DeviceEvent } from "App/device/constants"
import { SimCard } from "App/__deprecated__/renderer/models/basic-info/basic-info.typings"
import changeSimRequest from "App/__deprecated__/renderer/requests/change-sim.request"
import { testError } from "App/__deprecated__/renderer/store/constants"
import createMockStore from "redux-mock-store"
import thunk from "redux-thunk"
import { changeSim } from "./change-sim.action"

const mockStore = createMockStore([thunk])()

const simCardMock: SimCard = {
  network: "Network #1",
  networkLevel: 5,
  number: 1,
  slot: 1,
  active: true,
}

jest.mock("App/__deprecated__/renderer/requests/change-sim.request")

afterEach(() => {
  mockStore.clearActions()
})

describe("Change SimCard request returns `success` status", () => {
  test("fire async `changeSim` action and execute `SetSimData` event", async () => {
    ;(changeSimRequest as jest.Mock).mockReturnValueOnce({
      status: RequestResponseStatus.Ok,
    })
    const {
      meta: { requestId },
      // AUTO DISABLED - fix me if you like :)
      // eslint-disable-next-line @typescript-eslint/await-thenable
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
      status: RequestResponseStatus.Error,
    })
    const errorMock = new AppError(
      DeviceError.ChangeSim,
      "Cannot change sim card"
    )
    const {
      meta: { requestId },
      // AUTO DISABLED - fix me if you like :)
      // eslint-disable-next-line @typescript-eslint/await-thenable
    } = await mockStore.dispatch(changeSim(simCardMock) as unknown as AnyAction)

    expect(mockStore.getActions()).toEqual([
      changeSim.pending(requestId, simCardMock),
      changeSim.rejected(testError, requestId, simCardMock, errorMock),
    ])
  })
})
