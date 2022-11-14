/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import createMockStore from "redux-mock-store"
import thunk from "redux-thunk"
import { AnyAction } from "@reduxjs/toolkit"
import { Result } from "App/core/builder"
import { AppError } from "App/core/errors"
import { DeviceType } from "App/device/constants"
import { lockedDevice } from "./locked-device.action"
import { unlockDeviceStatusRequest } from "App/device/requests/unlock-device-status.request"
import { deviceLockTimeRequest } from "App/device/requests/device-lock-time.request"
import { flags } from "App/feature-flags"
import { DeviceEvent } from "App/device"
import { RequestResponseStatus } from "App/core/types/request-response.interface"

jest.mock("App/feature-flags")
jest.mock("App/device/requests/device-lock-time.request")
jest.mock("App/device/requests/unlock-device-status.request")

describe("Device: MuditaHarmony", () => {
  describe("Get Device Lock Time request returns `success` status", () => {
    test("fire async `lockedDevice` do not call `deviceLockTimeRequest`", async () => {
      const mockStore = createMockStore([thunk])({
        device: {
          deviceType: DeviceType.MuditaHarmony,
        },
      })
      const {
        meta: { requestId },
        // AUTO DISABLED - fix me if you like :)
        // eslint-disable-next-line @typescript-eslint/await-thenable
      } = await mockStore.dispatch(lockedDevice() as unknown as AnyAction)

      expect(mockStore.getActions()).toEqual([
        lockedDevice.pending(requestId),
        lockedDevice.fulfilled(undefined, requestId, undefined),
      ])

      expect(deviceLockTimeRequest).not.toHaveBeenCalled()
    })
  })
})

describe("Device: MuditaPure", () => {
  describe("Get Device Lock Time request returns `success` status", () => {
    test("fire async `lockedDevice` set device lock time", async () => {
      jest.spyOn(flags, "get").mockReturnValueOnce(true)
      ;(deviceLockTimeRequest as jest.Mock).mockReturnValueOnce(
        Result.success({
          phoneLockTime: 123456789,
        })
      )
      ;(unlockDeviceStatusRequest as jest.Mock).mockReturnValueOnce(
        Result.success(RequestResponseStatus.Ok)
      )

      const mockStore = createMockStore([thunk])({
        device: {
          deviceType: DeviceType.MuditaPure,
        },
      })
      const {
        meta: { requestId },
        // AUTO DISABLED - fix me if you like :)
        // eslint-disable-next-line @typescript-eslint/await-thenable
      } = await mockStore.dispatch(lockedDevice() as unknown as AnyAction)

      expect(mockStore.getActions()).toEqual([
        lockedDevice.pending(requestId),
        {
          type: DeviceEvent.SetLockTime,
          payload: { phoneLockTime: 123456789 },
        },
        lockedDevice.fulfilled(undefined, requestId, undefined),
      ])

      expect(deviceLockTimeRequest).toHaveBeenCalled()
    })
  })

  describe("Get Device Lock Time request returns `unprocessable-entity` status", () => {
    test("fire async `lockedDevice` removes device lock time", async () => {
      jest.spyOn(flags, "get").mockReturnValueOnce(true)
      ;(deviceLockTimeRequest as jest.Mock).mockReturnValueOnce(
        Result.failed(new AppError("", ""))
      )
      ;(unlockDeviceStatusRequest as jest.Mock).mockReturnValueOnce(
        Result.success(RequestResponseStatus.Ok)
      )
      const mockStore = createMockStore([thunk])({
        device: {
          deviceType: DeviceType.MuditaPure,
        },
      })
      const {
        meta: { requestId },
        // AUTO DISABLED - fix me if you like :)
        // eslint-disable-next-line @typescript-eslint/await-thenable
      } = await mockStore.dispatch(lockedDevice() as unknown as AnyAction)

      expect(mockStore.getActions()).toEqual([
        lockedDevice.pending(requestId),
        {
          type: DeviceEvent.SetLockTime,
          payload: undefined,
        },
        lockedDevice.fulfilled(undefined, requestId, undefined),
      ])

      expect(deviceLockTimeRequest).toHaveBeenCalled()
    })
  })

  describe("Get Device Lock Status request returns `agreement-is-not-accepted` status", () => {
    test("fire async `lockedDevice` calls `setAgreementStatus` action", async () => {
      jest.spyOn(flags, "get").mockReturnValueOnce(true)
      ;(deviceLockTimeRequest as jest.Mock).mockReturnValueOnce(
        Result.failed(new AppError("", ""))
      )
      ;(unlockDeviceStatusRequest as jest.Mock).mockReturnValueOnce(
        Result.success(RequestResponseStatus.NotAcceptable)
      )
      const mockStore = createMockStore([thunk])({
        device: {
          deviceType: DeviceType.MuditaPure,
        },
      })
      const {
        meta: { requestId },
        // AUTO DISABLED - fix me if you like :)
        // eslint-disable-next-line @typescript-eslint/await-thenable
      } = await mockStore.dispatch(lockedDevice() as unknown as AnyAction)

      expect(mockStore.getActions()).toEqual([
        lockedDevice.pending(requestId),
        {
          type: DeviceEvent.AgreementStatus,
          payload: false,
        },
        {
          type: DeviceEvent.SetLockTime,
          payload: undefined,
        },
        lockedDevice.fulfilled(undefined, requestId, undefined),
      ])

      expect(deviceLockTimeRequest).toHaveBeenCalled()
      expect(unlockDeviceStatusRequest).toHaveBeenCalled()
    })
  })
})
