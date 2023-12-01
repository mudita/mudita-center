/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { Result } from "App/core/builder"
import { AppError } from "App/core/errors"
import { DeviceCommunicationError } from "App/device/constants"
import { DeviceManager } from "App/device-manager/services/device-manager.service"
import { CrashDumpService } from "App/crash-dump/services/crash-dump.service"
import { DeviceFileSystemService } from "App/device-file-system/services"
import { RequestResponseStatus } from "App/core/types/request-response.interface"

const deviceManager = {
  device: {
    request: jest.fn(),
  },
} as unknown as DeviceManager

const deviceFileSystemMock = {
  downloadDeviceFilesLocally: jest.fn(),
} as unknown as DeviceFileSystemService

const subject = new CrashDumpService(deviceManager, deviceFileSystemMock)

afterEach(() => {
  jest.resetAllMocks()
})

describe("Method: getDeviceCrashDumpFiles", () => {
  test("returns list of files if `Endpoint.DeviceInfo` endpoint returns `success` and list of files", async () => {
    deviceManager.device.request = jest.fn().mockReturnValueOnce(
      Result.success({
        files: ["/sys/crash_dumps/crashdump.hex"],
      })
    )

    // AUTO DISABLED - fix me if you like :)
    // eslint-disable-next-line @typescript-eslint/unbound-method
    expect(deviceManager.device.request).not.toHaveBeenCalled()
    expect(await subject.getDeviceCrashDumpFiles()).toEqual({
      data: ["/sys/crash_dumps/crashdump.hex"],
      status: RequestResponseStatus.Ok,
    })
    // AUTO DISABLED - fix me if you like :)
    // eslint-disable-next-line @typescript-eslint/unbound-method
    expect(deviceManager.device.request).toHaveBeenCalled()
  })

  test("returns an `Error` status if data key isn't exists", async () => {
    deviceManager.device.request = jest
      .fn()
      .mockReturnValueOnce(Result.success(undefined))

    // AUTO DISABLED - fix me if you like :)
    // eslint-disable-next-line @typescript-eslint/unbound-method
    expect(deviceManager.device.request).not.toHaveBeenCalled()
    expect(await subject.getDeviceCrashDumpFiles()).toEqual({
      status: RequestResponseStatus.Error,
    })
    // AUTO DISABLED - fix me if you like :)
    // eslint-disable-next-line @typescript-eslint/unbound-method
    expect(deviceManager.device.request).toHaveBeenCalled()
  })

  test("returns an `Error` status if status isn't equal to `Ok`", async () => {
    deviceManager.device.request = jest
      .fn()
      .mockReturnValueOnce(
        Result.failed(
          new AppError(
            DeviceCommunicationError.RequestFailed,
            "Something went wrong"
          )
        )
      )

    // AUTO DISABLED - fix me if you like :)
    // eslint-disable-next-line @typescript-eslint/unbound-method
    expect(deviceManager.device.request).not.toHaveBeenCalled()
    expect(await subject.getDeviceCrashDumpFiles()).toEqual({
      status: RequestResponseStatus.Error,
    })
    // AUTO DISABLED - fix me if you like :)
    // eslint-disable-next-line @typescript-eslint/unbound-method
    expect(deviceManager.device.request).toHaveBeenCalled()
  })
})

describe("Method: downloadDeviceCrashDumpFiles", () => {
  test("returns local files urls if `downloadDeviceFilesLocally` returns `success` status and files list exists", async () => {
    deviceManager.device.request = jest.fn().mockReturnValueOnce(
      Result.success({
        files: ["/sys/crash_dumps/crashdump.hex"],
      })
    )
    ;(
      deviceFileSystemMock.downloadDeviceFilesLocally as jest.Mock
    ).mockReturnValueOnce(
      Result.success(["C:/MuditaOs/crash-dumps/crashdump.hex"])
    )

    // AUTO DISABLED - fix me if you like :)
    // eslint-disable-next-line @typescript-eslint/unbound-method
    expect(deviceManager.device.request).not.toHaveBeenCalled()
    expect(
      // AUTO DISABLED - fix me if you like :)
      // eslint-disable-next-line @typescript-eslint/unbound-method
      deviceFileSystemMock.downloadDeviceFilesLocally
    ).not.toHaveBeenCalled()

    expect(await subject.downloadDeviceCrashDumpFiles()).toEqual({
      data: ["C:/MuditaOs/crash-dumps/crashdump.hex"],
      status: RequestResponseStatus.Ok,
    })

    // AUTO DISABLED - fix me if you like :)
    // eslint-disable-next-line @typescript-eslint/unbound-method
    expect(deviceManager.device.request).toHaveBeenCalled()
    expect(
      // AUTO DISABLED - fix me if you like :)
      // eslint-disable-next-line @typescript-eslint/unbound-method
      deviceFileSystemMock.downloadDeviceFilesLocally
    ).toHaveBeenCalledWith(["/sys/crash_dumps/crashdump.hex"], {
      cwd: "crash-dumps",
    })
  })

  test("returns an `Error` status if `getDeviceFiles` returns empty data", async () => {
    deviceManager.device.request = jest
      .fn()
      .mockReturnValueOnce(Result.success(undefined))

    // AUTO DISABLED - fix me if you like :)
    // eslint-disable-next-line @typescript-eslint/unbound-method
    expect(deviceManager.device.request).not.toHaveBeenCalled()
    expect(
      // AUTO DISABLED - fix me if you like :)
      // eslint-disable-next-line @typescript-eslint/unbound-method
      deviceFileSystemMock.downloadDeviceFilesLocally
    ).not.toHaveBeenCalled()

    expect(await subject.downloadDeviceCrashDumpFiles()).toEqual({
      status: RequestResponseStatus.Error,
    })

    // AUTO DISABLED - fix me if you like :)
    // eslint-disable-next-line @typescript-eslint/unbound-method
    expect(deviceManager.device.request).toHaveBeenCalled()
    expect(
      // AUTO DISABLED - fix me if you like :)
      // eslint-disable-next-line @typescript-eslint/unbound-method
      deviceFileSystemMock.downloadDeviceFilesLocally
    ).not.toHaveBeenCalled()
  })

  test("returns an `Error` status if `getDeviceFiles` returns `Error` status", async () => {
    deviceManager.device.request = jest
      .fn()
      .mockReturnValueOnce(Result.success(undefined))

    // AUTO DISABLED - fix me if you like :)
    // eslint-disable-next-line @typescript-eslint/unbound-method
    expect(deviceManager.device.request).not.toHaveBeenCalled()
    expect(
      // AUTO DISABLED - fix me if you like :)
      // eslint-disable-next-line @typescript-eslint/unbound-method
      deviceFileSystemMock.downloadDeviceFilesLocally
    ).not.toHaveBeenCalled()

    expect(await subject.downloadDeviceCrashDumpFiles()).toEqual({
      status: RequestResponseStatus.Error,
    })

    // AUTO DISABLED - fix me if you like :)
    // eslint-disable-next-line @typescript-eslint/unbound-method
    expect(deviceManager.device.request).toHaveBeenCalled()
    expect(
      // AUTO DISABLED - fix me if you like :)
      // eslint-disable-next-line @typescript-eslint/unbound-method
      deviceFileSystemMock.downloadDeviceFilesLocally
    ).not.toHaveBeenCalled()
  })

  test("returns an `Error` status if `downloadDeviceFilesLocally` returns empty data", async () => {
    deviceManager.device.request = jest.fn().mockReturnValueOnce(
      Result.success({
        files: ["/sys/crash_dumps/crashdump.hex"],
      })
    )
    ;(
      deviceFileSystemMock.downloadDeviceFilesLocally as jest.Mock
    ).mockReturnValueOnce({
      status: RequestResponseStatus.Ok,
      data: undefined,
    })

    // AUTO DISABLED - fix me if you like :)
    // eslint-disable-next-line @typescript-eslint/unbound-method
    expect(deviceManager.device.request).not.toHaveBeenCalled()
    expect(
      // AUTO DISABLED - fix me if you like :)
      // eslint-disable-next-line @typescript-eslint/unbound-method
      deviceFileSystemMock.downloadDeviceFilesLocally
    ).not.toHaveBeenCalled()

    expect(await subject.downloadDeviceCrashDumpFiles()).toEqual({
      status: RequestResponseStatus.Error,
    })

    // AUTO DISABLED - fix me if you like :)
    // eslint-disable-next-line @typescript-eslint/unbound-method
    expect(deviceManager.device.request).toHaveBeenCalled()
    expect(
      // AUTO DISABLED - fix me if you like :)
      // eslint-disable-next-line @typescript-eslint/unbound-method
      deviceFileSystemMock.downloadDeviceFilesLocally
    ).toHaveBeenCalledWith(["/sys/crash_dumps/crashdump.hex"], {
      cwd: "crash-dumps",
    })
  })

  test("returns an `Error` status if `downloadDeviceFilesLocally` returns `Error` status", async () => {
    deviceManager.device.request = jest.fn().mockReturnValueOnce(
      Result.success({
        files: ["/sys/crash_dumps/crashdump.hex"],
      })
    )
    ;(
      deviceFileSystemMock.downloadDeviceFilesLocally as jest.Mock
    ).mockReturnValueOnce({
      status: RequestResponseStatus.Error,
    })

    // AUTO DISABLED - fix me if you like :)
    // eslint-disable-next-line @typescript-eslint/unbound-method
    expect(deviceManager.device.request).not.toHaveBeenCalled()
    expect(
      // AUTO DISABLED - fix me if you like :)
      // eslint-disable-next-line @typescript-eslint/unbound-method
      deviceFileSystemMock.downloadDeviceFilesLocally
    ).not.toHaveBeenCalled()

    expect(await subject.downloadDeviceCrashDumpFiles()).toEqual({
      status: RequestResponseStatus.Error,
    })

    // AUTO DISABLED - fix me if you like :)
    // eslint-disable-next-line @typescript-eslint/unbound-method
    expect(deviceManager.device.request).toHaveBeenCalled()
    expect(
      // AUTO DISABLED - fix me if you like :)
      // eslint-disable-next-line @typescript-eslint/unbound-method
      deviceFileSystemMock.downloadDeviceFilesLocally
    ).toHaveBeenCalledWith(["/sys/crash_dumps/crashdump.hex"], {
      cwd: "crash-dumps",
    })
  })
})
