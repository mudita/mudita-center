/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import createMockStore from "redux-mock-store"
import thunk from "redux-thunk"
import { AnyAction } from "@reduxjs/toolkit"
import { DeviceType } from "@mudita/pure"
import { lockedDevice } from "./locked-device.action"
import getDeviceLockTime from "App/renderer/requests/get-device-lock-time.request"
import { flags } from "App/feature-flags"
import { DeviceEvent } from "App/device"
import { RequestResponseStatus } from "App/core/types/request-response.interface"

jest.mock("App/feature-flags")
jest.mock("App/renderer/requests/get-device-lock-time.request")

describe("Device: MuditaHarmony", () => {
  describe("Get Device Lock Time request returns `success` status", () => {
    test("fire async `lockedDevice` do not call `getDeviceLockTime`", async () => {
      const mockStore = createMockStore([thunk])({
        device: {
          deviceType: DeviceType.MuditaHarmony,
        },
      })
      const {
        meta: { requestId },
      } = await mockStore.dispatch(lockedDevice() as unknown as AnyAction)

      expect(mockStore.getActions()).toEqual([
        lockedDevice.pending(requestId),
        lockedDevice.fulfilled(undefined, requestId, undefined),
      ])

      expect(getDeviceLockTime).not.toHaveBeenCalled()
    })
  })
})

describe("Device: MuditaPure", () => {
  describe("Get Device Lock Time request returns `success` status", () => {
    test("fire async `lockedDevice` set device lock time", async () => {
      jest.spyOn(flags, "get").mockReturnValueOnce(true)
      ;(getDeviceLockTime as jest.Mock).mockReturnValueOnce({
        status: RequestResponseStatus.Ok,
        data: {
          phoneLockTime: 123456789,
        },
      })
      const mockStore = createMockStore([thunk])({
        device: {
          deviceType: DeviceType.MuditaPure,
        },
      })
      const {
        meta: { requestId },
      } = await mockStore.dispatch(lockedDevice() as unknown as AnyAction)

      expect(mockStore.getActions()).toEqual([
        lockedDevice.pending(requestId),
        {
          type: DeviceEvent.SetLockTime,
          payload: { phoneLockTime: 123456789 },
        },
        lockedDevice.fulfilled(undefined, requestId, undefined),
      ])

      expect(getDeviceLockTime).toHaveBeenCalled()
    })
  })

  describe("Get Device Lock Time request returns `unprocessable-entity` status", () => {
    test("fire async `lockedDevice` removes device lock time", async () => {
      jest.spyOn(flags, "get").mockReturnValueOnce(true)
      ;(getDeviceLockTime as jest.Mock).mockReturnValueOnce({
        status: RequestResponseStatus.UnprocessableEntity,
      })
      const mockStore = createMockStore([thunk])({
        device: {
          deviceType: DeviceType.MuditaPure,
        },
      })
      const {
        meta: { requestId },
      } = await mockStore.dispatch(lockedDevice() as unknown as AnyAction)

      expect(mockStore.getActions()).toEqual([
        lockedDevice.pending(requestId),
        {
          type: DeviceEvent.SetLockTime,
          payload: undefined,
        },
        lockedDevice.fulfilled(undefined, requestId, undefined),
      ])

      expect(getDeviceLockTime).toHaveBeenCalled()
    })
  })
})
