/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import fs, { Stats } from "fs"
import { AppError } from "App/core/errors"
import { Result } from "App/core/builder"
import { DeviceManager } from "App/device-manager/services"
import { RequestResponseStatus } from "App/core/types/request-response.interface"
import { DeviceFileSystemService } from "App/device-file-system/services"
import {
  CaseColor,
  DeviceType,
  DeviceCommunicationError,
  OnboardingState,
} from "App/device/constants"
import { DeviceInfo } from "App/device-info/dto"
import { SettingsService } from "App/settings/services/settings.service"
import { UpdateErrorServiceErrors } from "App/update/constants"
import { UpdateOS } from "App/update/dto"
import { DeviceUpdateService } from "App/update/services/device-update.service"
import { DeviceInfoService } from "App/device-info/services"
import { normalize } from "path"

let settingsService: SettingsService
let deviceManager: DeviceManager
let deviceFileSystem: DeviceFileSystemService
let subject: DeviceUpdateService
let deviceInfoService: DeviceInfoService

const payloadMock: UpdateOS = {
  fileName: normalize("/update.tar"),
}

const deviceInfoResponseMock: DeviceInfo = {
  onboardingState: OnboardingState.Finished,
  memorySpace: {
    reservedSpace: 0,
    usedUserSpace: 0,
    total: 0,
  },
  networkLevel: "25",
  networkName: "Play",
  simCards: [],
  backupFilePath: "",
  updateFilePath: normalize("/sys/user/update.tar"),
  recoveryStatusFilePath: "",
  syncFilePath: "",
  batteryLevel: 100,
  caseColour: CaseColor.Black,
  serialNumber: "00000010133631",
  osVersion: "1.4.0",
}

const oneMB = 1024 * 1024

afterEach(() => {
  jest.resetAllMocks()
})

beforeEach(() => {
  settingsService = {
    getByKey: jest.fn().mockReturnValue(normalize("/some/path/")),
  } as unknown as SettingsService

  deviceManager = {
    device: {
      deviceType: DeviceType.MuditaPure,
    },
    request: jest.fn(),
  } as unknown as DeviceManager

  deviceFileSystem = {
    uploadFileLocally: jest.fn(),
    removeDeviceFile: jest.fn(),
  } as unknown as DeviceFileSystemService

  deviceInfoService = {
    getDeviceFreeSpace: jest.fn().mockReturnValue({ ok: true, data: 3 }),
    getDeviceInfo: jest
      .fn()
      .mockReturnValue(Result.success(deviceInfoResponseMock)),
  } as unknown as DeviceInfoService

  subject = new DeviceUpdateService(
    settingsService,
    deviceManager,
    deviceFileSystem,
    deviceInfoService
  )

  jest.spyOn(fs, "lstatSync").mockReturnValue({
    size: oneMB,
  } as Stats)
})

describe("Method: updateOs", () => {
  describe("when not enough space on Pure device", () => {
    test("action should end with `Result.failed`", async () => {
      jest.spyOn(fs, "lstatSync").mockReturnValue({
        size: 3 * oneMB,
      } as Stats)
      deviceFileSystem.uploadFileLocally = jest
        .fn()
        .mockResolvedValueOnce(Result.failed(new AppError("", "")))

      const result = await subject.updateOs(payloadMock)

      expect(result).toEqual(
        Result.failed(
          new AppError(
            UpdateErrorServiceErrors.NotEnoughSpace,
            `Cannot upload ${normalize(
              "/some/path/update.tar"
            )} to device - not enough space`
          )
        )
      )
      // AUTO DISABLED - fix me if you like :)
      // eslint-disable-next-line @typescript-eslint/unbound-method
      expect(settingsService.getByKey).toHaveBeenLastCalledWith(
        "osDownloadLocation"
      )
    })
  })
  describe("when not enough space on Pure device", () => {
    test("action should end with `Result.failed`", async () => {
      jest.spyOn(fs, "lstatSync").mockReturnValue({
        size: 3 * oneMB,
      } as Stats)
      deviceFileSystem.uploadFileLocally = jest
        .fn()
        .mockResolvedValueOnce(Result.failed(new AppError("", "")))

      const result = await subject.updateOs(payloadMock)

      expect(result).toEqual(
        Result.failed(
          new AppError(
            UpdateErrorServiceErrors.NotEnoughSpace,
            `Cannot upload ${normalize(
              "/some/path/update.tar"
            )} to device - not enough space`
          )
        )
      )
      // AUTO DISABLED - fix me if you like :)
      // eslint-disable-next-line @typescript-eslint/unbound-method
      expect(settingsService.getByKey).toHaveBeenLastCalledWith(
        "osDownloadLocation"
      )
    })
  })

  describe("when onboarding is not complete", () => {
    test("action should end with `Result.failed`", async () => {
      deviceInfoService.getDeviceInfo = jest.fn().mockReturnValue(
        Result.success({
          ...deviceInfoResponseMock,
          onboardingState: OnboardingState.InProgress,
        })
      )

      const result = await subject.updateOs(payloadMock)

      expect(result).toEqual(
        Result.failed(
          new AppError(
            UpdateErrorServiceErrors.OnboardingNotComplete,
            "Onboarding not complete"
          )
        )
      )
    })
  })

  describe("when `currentDeviceInitializationFailed` is set to `true`", () => {
    test("action should end with `Result.failed`", async () => {
      deviceManager.device.request = jest
        .fn()
        .mockResolvedValueOnce(Result.success(undefined))

      deviceFileSystem.uploadFileLocally = jest
        .fn()
        .mockResolvedValueOnce(Result.success(true))
      deviceManager.currentDeviceInitializationFailed = true

      const result = await subject.updateOs(payloadMock)

      expect(result).toEqual(
        Result.failed(
          new AppError(
            UpdateErrorServiceErrors.DeviceInitializationFailed,
            "The device no initialized successful after restart"
          )
        )
      )
    })
  })

  test("deviceInfoService.getDeviceInfo returns `Result.failed`", async () => {
    deviceInfoService.getDeviceInfo = jest.fn().mockResolvedValueOnce({
      data: undefined,
      status: RequestResponseStatus.Error,
    })

    const result = await subject.updateOs(payloadMock)

    expect(result).toEqual(
      Result.failed(
        new AppError(
          UpdateErrorServiceErrors.CannotGetOsVersion,
          "Current os version request failed"
        )
      )
    )
    // AUTO DISABLED - fix me if you like :)
    // eslint-disable-next-line @typescript-eslint/unbound-method
    expect(settingsService.getByKey).not.toHaveBeenCalled()
    // AUTO DISABLED - fix me if you like :)
    // eslint-disable-next-line @typescript-eslint/unbound-method
    expect(deviceFileSystem.uploadFileLocally).not.toHaveBeenCalled()
  })

  test("Upload File Locally method returns `Result.failed`", async () => {
    deviceFileSystem.uploadFileLocally = jest
      .fn()
      .mockResolvedValueOnce(Result.failed(new AppError("", "")))

    const result = await subject.updateOs(payloadMock)

    expect(result).toEqual(
      Result.failed(
        new AppError(
          UpdateErrorServiceErrors.UpdateFileUpload,
          `Cannot upload ${normalize("/some/path/update.tar")} to device`
        )
      )
    )
    // AUTO DISABLED - fix me if you like :)
    // eslint-disable-next-line @typescript-eslint/unbound-method
    expect(settingsService.getByKey).toHaveBeenLastCalledWith(
      "osDownloadLocation"
    )
    // AUTO DISABLED - fix me if you like :)
    // eslint-disable-next-line @typescript-eslint/unbound-method
    expect(deviceFileSystem.uploadFileLocally).toHaveBeenLastCalledWith({
      filePath: normalize("/some/path/update.tar"),
      targetPath: normalize("/sys/user/update.tar"),
    })
  })

  test("Device update endpoint returns `Result.failed`", async () => {
    deviceManager.device.request = jest.fn().mockResolvedValueOnce({
      data: undefined,
      status: DeviceCommunicationError.RequestFailed,
    })
    deviceFileSystem.uploadFileLocally = jest
      .fn()
      .mockResolvedValueOnce(Result.success(true))

    const result = await subject.updateOs(payloadMock)

    expect(result).toEqual(
      Result.failed(
        new AppError(
          UpdateErrorServiceErrors.UpdateCommand,
          "Cannot restart device"
        )
      )
    )
    // AUTO DISABLED - fix me if you like :)
    // eslint-disable-next-line @typescript-eslint/unbound-method
    expect(settingsService.getByKey).toHaveBeenLastCalledWith(
      "osDownloadLocation"
    )
    // AUTO DISABLED - fix me if you like :)
    // eslint-disable-next-line @typescript-eslint/unbound-method
    expect(deviceFileSystem.uploadFileLocally).toHaveBeenLastCalledWith({
      filePath: normalize("/some/path/update.tar"),
      targetPath: normalize("/sys/user/update.tar"),
    })
  })

  test("Returns `Result.failed` if device wakes up too long", async () => {
    deviceManager.device.request = jest
      .fn()
      .mockResolvedValueOnce(Result.success(undefined))

    deviceFileSystem.uploadFileLocally = jest
      .fn()
      .mockResolvedValueOnce(Result.success(true))
    jest
      // AUTO DISABLED - fix me if you like :)
      // eslint-disable-next-line @typescript-eslint/unbound-method, @typescript-eslint/no-explicit-any
      .spyOn(DeviceUpdateService.prototype as any, "waitUntilDeviceRestart")
      .mockResolvedValueOnce(
        Result.failed(
          new AppError(
            UpdateErrorServiceErrors.RequestLimitExceeded,
            "The device no restart successful in 10 minutes"
          )
        )
      )

    const result = await subject.updateOs(payloadMock)

    expect(result).toEqual(
      Result.failed(
        new AppError(
          UpdateErrorServiceErrors.RequestLimitExceeded,
          "The device no restart successful in 10 minutes"
        )
      )
    )
    // AUTO DISABLED - fix me if you like :)
    // eslint-disable-next-line @typescript-eslint/unbound-method
    expect(settingsService.getByKey).toHaveBeenLastCalledWith(
      "osDownloadLocation"
    )
    // AUTO DISABLED - fix me if you like :)
    // eslint-disable-next-line @typescript-eslint/unbound-method
    expect(deviceFileSystem.uploadFileLocally).toHaveBeenLastCalledWith({
      filePath: normalize("/some/path/update.tar"),
      targetPath: normalize("/sys/user/update.tar"),
    })
  })

  test("Returns `Result.success` if version from device endpoint after update changed", async () => {
    deviceManager.device.request = jest
      .fn()
      .mockResolvedValueOnce(Result.success(undefined))
    let isFirstRequest = true

    deviceInfoService.getDeviceInfo = jest.fn().mockImplementation(() => {
      if (isFirstRequest) {
        isFirstRequest = false
        return Result.success(deviceInfoResponseMock)
      } else {
        return Result.success({
          ...deviceInfoResponseMock,
          osVersion: "1.5.0",
        })
      }
    })

    deviceFileSystem.uploadFileLocally = jest
      .fn()
      .mockResolvedValueOnce(Result.success(true))
    jest
      // AUTO DISABLED - fix me if you like :)
      // eslint-disable-next-line @typescript-eslint/unbound-method, @typescript-eslint/no-explicit-any
      .spyOn(DeviceUpdateService.prototype as any, "waitUntilDeviceRestart")
      .mockResolvedValueOnce(Result.success(true))
    jest
      // AUTO DISABLED - fix me if you like :)
      // eslint-disable-next-line @typescript-eslint/unbound-method, @typescript-eslint/no-explicit-any
      .spyOn(DeviceUpdateService.prototype as any, "waitUntilDeviceUnlocked")
      .mockResolvedValueOnce(Result.success(true))

    const result = await subject.updateOs(payloadMock)

    expect(result).toEqual(Result.success(true))
    // AUTO DISABLED - fix me if you like :)
    // eslint-disable-next-line @typescript-eslint/unbound-method
    expect(settingsService.getByKey).toHaveBeenLastCalledWith(
      "osDownloadLocation"
    )
    // AUTO DISABLED - fix me if you like :)
    // eslint-disable-next-line @typescript-eslint/unbound-method
    expect(deviceFileSystem.uploadFileLocally).toHaveBeenLastCalledWith({
      filePath: normalize("/some/path/update.tar"),
      targetPath: normalize("/sys/user/update.tar"),
    })
  })
})

describe("Method: checkUpdate", () => {
  test("Returns `Result.failed` update was not performed before", async () => {
    const result = await subject.checkUpdate()

    expect(result).toEqual(
      Result.failed(
        new AppError(
          UpdateErrorServiceErrors.VersionDoesntChanged,
          "The version OS isn't changed"
        )
      )
    )
  })
  test("Returns `Result.failed` if version from device endpoint after update is equal to version before update", async () => {
    deviceManager.device.request = jest
      .fn()
      .mockResolvedValueOnce(Result.success(undefined))

    deviceFileSystem.uploadFileLocally = jest
      .fn()
      .mockResolvedValueOnce(Result.success(true))
    jest
      // AUTO DISABLED - fix me if you like :)
      // eslint-disable-next-line @typescript-eslint/unbound-method, @typescript-eslint/no-explicit-any
      .spyOn(DeviceUpdateService.prototype as any, "waitUntilDeviceRestart")
      .mockResolvedValueOnce(Result.success(true))
    jest
      // AUTO DISABLED - fix me if you like :)
      // eslint-disable-next-line @typescript-eslint/unbound-method, @typescript-eslint/no-explicit-any
      .spyOn(DeviceUpdateService.prototype as any, "waitUntilDeviceUnlocked")
      .mockResolvedValueOnce(Result.success(true))

    await subject.updateOs(payloadMock)
    const result = await subject.checkUpdate()

    expect(result).toEqual(
      Result.failed(
        new AppError(
          UpdateErrorServiceErrors.VersionDoesntChanged,
          "The version OS isn't changed"
        )
      )
    )
  })
})
