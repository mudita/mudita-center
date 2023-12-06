/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import createMockStore, { MockStoreEnhanced } from "redux-mock-store"
import thunk from "redux-thunk"
import { AnyAction } from "@reduxjs/toolkit"
import { Result } from "Core/core/builder"
import { AppError } from "Core/core/errors"
import { DeviceCommunicationError, DeviceType } from "Core/device/constants"
import { lockedDevice } from "Core/device"
import { unlockDeviceStatusRequest } from "Core/device/requests/unlock-device-status.request"
import { deviceLockTimeRequest } from "Core/device/requests/device-lock-time.request"
import { flags } from "Core/feature-flags"
import { DeviceEvent } from "Core/device"
import { RequestResponseStatus } from "Core/core/types/request-response.interface"

jest.mock("Core/feature-flags")
jest.mock("Core/device/requests/device-lock-time.request")
jest.mock("Core/device/requests/unlock-device-status.request")

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

  describe("Get Device Lock Status request returns `DeviceAgreementNotAccepted` or `BatteryCriticalLevel`", () => {
    let mockStore: MockStoreEnhanced<unknown, Record<string, unknown>>

    beforeEach(() => {
      mockStore = createMockStore<unknown, Record<string, unknown>>([thunk])({
        device: {
          deviceType: DeviceType.MuditaPure,
        },
      })

      jest.spyOn(flags, "get").mockReturnValueOnce(true)
      ;(deviceLockTimeRequest as jest.Mock).mockReturnValueOnce(
        Result.failed(new AppError("", ""))
      )
    })

    test("fire async `lockedDevice` calls `setOnboardingStatus` action", async () => {
      ;(unlockDeviceStatusRequest as jest.Mock).mockReturnValueOnce(
        Result.failed(
          new AppError(
            DeviceCommunicationError.DeviceOnboardingNotFinished,
            "Oups, onboarding not finished!"
          )
        )
      )

      const {
        meta: { requestId },
        // AUTO DISABLED - fix me if you like :)
        // eslint-disable-next-line @typescript-eslint/await-thenable
      } = await mockStore.dispatch(lockedDevice() as unknown as AnyAction)

      expect(mockStore.getActions()).toEqual([
        lockedDevice.pending(requestId),
        {
          type: DeviceEvent.OnboardingStatus,
          payload: false,
        },
        { type: DeviceEvent.SetLockTime, payload: undefined },
        lockedDevice.fulfilled(undefined, requestId, undefined),
      ])

      expect(deviceLockTimeRequest).toHaveBeenCalled()
      expect(unlockDeviceStatusRequest).toHaveBeenCalled()
    })

    test("fire async `lockedDevice` calls `setCriticalBatteryLevel` action", async () => {
      ;(unlockDeviceStatusRequest as jest.Mock).mockReturnValueOnce(
        Result.failed(
          new AppError(
            DeviceCommunicationError.BatteryCriticalLevel,
            "Upsik, a critical battery level, I have to charge it!"
          )
        )
      )

      const {
        meta: { requestId },
        // AUTO DISABLED - fix me if you like :)
        // eslint-disable-next-line @typescript-eslint/await-thenable
      } = await mockStore.dispatch(lockedDevice() as unknown as AnyAction)

      expect(mockStore.getActions()).toEqual([
        lockedDevice.pending(requestId),
        {
          type: DeviceEvent.CriticalBatteryLevel,
          payload: true,
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
