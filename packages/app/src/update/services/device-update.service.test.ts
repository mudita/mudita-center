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
  AccessTechnology,
  BatteryState,
  CaseColor,
  DeviceType,
  Endpoint,
  Method,
  NetworkStatus,
  SignalStrength,
  SIM,
  Tray,
  DeviceCommunicationError,
} from "App/device/constants"
import { DeviceInfo, RequestConfig } from "App/device/types/mudita-os"
import { SettingsService } from "App/settings/services/settings.service"
import { UpdateErrorServiceErrors } from "App/update/constants"
import { UpdateOS } from "App/update/dto"
import { DeviceUpdateService } from "App/update/services/device-update.service"
import { DeviceInfoService } from "App/device-info/services"

let settingsService: SettingsService
let deviceManager: DeviceManager
let deviceFileSystem: DeviceFileSystemService
let subject: DeviceUpdateService
let deviceInfoService: DeviceInfoService

const payloadMock: UpdateOS = {
  fileName: "/update.tar",
}

const deviceInfoResponseMock: DeviceInfo = {
  accessTechnology: AccessTechnology.Gsm,
  backupFilePath: "",
  updateFilePath: undefined,
  recoveryStatusFilePath: "",
  syncFilePath: "",
  batteryLevel: "100",
  batteryState: BatteryState.Discharging,
  caseColour: CaseColor.Black,
  currentRTCTime: "1667993610",
  deviceSpaceTotal: "14945",
  deviceToken: "Pziv07Iz9E5OBOLfOwXqPJgWCRsE1Xfu",
  gitBranch: "HEAD",
  gitRevision: "b6ae5b95",
  networkOperatorName: "Play",
  networkStatus: NetworkStatus.RegisteredHomeNetwork,
  selectedSim: SIM.One,
  serialNumber: "00000010133631",
  signalStrength: SignalStrength.Four,
  systemReservedSpace: "2042",
  trayState: Tray.In,
  usedUserSpace: "1674",
  version: "1.4.0",
}

const oneMB = 1024 * 1024

afterEach(() => {
  jest.resetAllMocks()
})

beforeEach(() => {
  settingsService = {
    getByKey: jest.fn().mockReturnValue("/some/path/"),
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
    getDeviceFreeSpace: jest.fn().mockReturnValue({ ok: true, data: 2 }),
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
  describe("When not enough space on Pure device", () => {
    test("action should end with `Result.failed`", async () => {
      jest.spyOn(fs, "lstatSync").mockReturnValue({
        size: 3 * oneMB,
      } as Stats)
      deviceManager.device.request = jest
        .fn()
        .mockResolvedValueOnce(Result.success(deviceInfoResponseMock))
      deviceFileSystem.uploadFileLocally = jest
        .fn()
        .mockResolvedValueOnce(Result.failed(new AppError("", "")))

      const result = await subject.updateOs(payloadMock)

      expect(result).toEqual(
        Result.failed(
          new AppError(
            UpdateErrorServiceErrors.NotEnoughSpace,
            "Cannot upload /some/path/update.tar to device - not enough space"
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
  test("Device info endpoint returns `Result.failed`", async () => {
    deviceManager.device.request = jest.fn().mockResolvedValueOnce({
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
    deviceManager.device.request = jest
      .fn()
      .mockResolvedValueOnce(Result.success(deviceInfoResponseMock))
    deviceFileSystem.uploadFileLocally = jest
      .fn()
      .mockResolvedValueOnce(Result.failed(new AppError("", "")))

    const result = await subject.updateOs(payloadMock)

    expect(result).toEqual(
      Result.failed(
        new AppError(
          UpdateErrorServiceErrors.UpdateFileUpload,
          "Cannot upload /some/path/update.tar to device"
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
      filePath: "/some/path/update.tar",
      targetPath: "/sys/user/update.tar",
    })
  })

  test("Device update endpoint returns `Result.failed`", async () => {
    deviceManager.device.request = jest
      .fn()
      .mockImplementation((config: RequestConfig) => {
        if (
          config.endpoint === Endpoint.DeviceInfo &&
          config.method === Method.Get
        ) {
          return Result.success(deviceInfoResponseMock)
        }

        if (
          config.endpoint === Endpoint.Update &&
          config.method === Method.Post
        ) {
          return Result.failed(
            new AppError(
              DeviceCommunicationError.RequestFailed,
              "Something went wrong"
            )
          )
        }

        return Result.failed(
          new AppError(
            DeviceCommunicationError.RequestFailed,
            "Something went wrong"
          )
        )
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
      filePath: "/some/path/update.tar",
      targetPath: "/sys/user/update.tar",
    })
  })

  test("Returns `Result.failed` if device wakes up too long", async () => {
    deviceManager.device.request = jest
      .fn()
      .mockImplementation((config: RequestConfig) => {
        if (
          config.endpoint === Endpoint.DeviceInfo &&
          config.method === Method.Get
        ) {
          return Result.success(deviceInfoResponseMock)
        }

        if (
          config.endpoint === Endpoint.Update &&
          config.method === Method.Post
        ) {
          return Result.success(undefined)
        }

        return Result.failed(
          new AppError(
            DeviceCommunicationError.RequestFailed,
            "Something went wrong"
          )
        )
      })
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
      filePath: "/some/path/update.tar",
      targetPath: "/sys/user/update.tar",
    })
  })

  test("Returns `Result.failed` if version from device endpoint after update is equal to version before update", async () => {
    deviceManager.device.request = jest
      .fn()
      .mockImplementation((config: RequestConfig) => {
        if (
          config.endpoint === Endpoint.DeviceInfo &&
          config.method === Method.Get
        ) {
          return Result.success(deviceInfoResponseMock)
        }

        if (
          config.endpoint === Endpoint.Update &&
          config.method === Method.Post
        ) {
          return Result.success(undefined)
        }

        return Result.failed(
          new AppError(
            DeviceCommunicationError.RequestFailed,
            "Something went wrong"
          )
        )
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

    expect(result).toEqual(
      Result.failed(
        new AppError(
          UpdateErrorServiceErrors.VersionDoesntChanged,
          "The version OS isn't changed"
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
      filePath: "/some/path/update.tar",
      targetPath: "/sys/user/update.tar",
    })
  })

  test("Returns `Result.success` if version from device endpoint after update changed", async () => {
    let isFirstRequest = true

    deviceManager.device.request = jest
      .fn()
      .mockImplementation((config: RequestConfig) => {
        if (
          config.endpoint === Endpoint.DeviceInfo &&
          config.method === Method.Get
        ) {
          if (isFirstRequest) {
            isFirstRequest = false
            return Result.success(deviceInfoResponseMock)
          } else {
            return Result.success({
              ...deviceInfoResponseMock,
              version: "1.5.0",
            })
          }
        }

        if (
          config.endpoint === Endpoint.Update &&
          config.method === Method.Post
        ) {
          return Result.success(undefined)
        }

        return Result.failed(
          new AppError(
            DeviceCommunicationError.RequestFailed,
            "Something went wrong"
          )
        )
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
      filePath: "/some/path/update.tar",
      targetPath: "/sys/user/update.tar",
    })
  })
})
