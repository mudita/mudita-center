/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { Result } from "Core/core/builder"
import { AppError } from "Core/core/errors"
import { DeviceCommunicationError } from "core-device/models"
import { DeviceProtocol } from "device-protocol/feature"
import { CrashDumpService } from "Core/crash-dump/services/crash-dump.service"
import { DeviceFileSystemService } from "Core/device-file-system/services"
import { RequestResponseStatus } from "Core/core/types/request-response.interface"

const deviceProtocol = {
  device: {
    request: jest.fn(),
  },
} as unknown as DeviceProtocol

const deviceFileSystemMock = {
  downloadDeviceFilesLocally: jest.fn(),
} as unknown as DeviceFileSystemService

const subject = new CrashDumpService(deviceProtocol, deviceFileSystemMock)

afterEach(() => {
  jest.resetAllMocks()
})

describe("Method: getDeviceCrashDumpFiles", () => {
  test("returns list of files if `Endpoint.DeviceInfo` endpoint returns `success` and list of files", async () => {
    deviceProtocol.device.request = jest.fn().mockReturnValueOnce(
      Result.success({
        files: ["/sys/crash_dumps/crashdump.hex"],
      })
    )

    // AUTO DISABLED - fix me if you like :)
    // eslint-disable-next-line @typescript-eslint/unbound-method
    expect(deviceProtocol.device.request).not.toHaveBeenCalled()
    expect(await subject.getDeviceCrashDumpFiles()).toEqual({
      data: ["/sys/crash_dumps/crashdump.hex"],
      status: RequestResponseStatus.Ok,
    })
    // AUTO DISABLED - fix me if you like :)
    // eslint-disable-next-line @typescript-eslint/unbound-method
    expect(deviceProtocol.device.request).toHaveBeenCalled()
  })

  test("returns empty list of files if  if data key isn't exists", async () => {
    deviceProtocol.device.request = jest
      .fn()
      .mockReturnValueOnce(Result.success(undefined))

    // AUTO DISABLED - fix me if you like :)
    // eslint-disable-next-line @typescript-eslint/unbound-method
    expect(deviceProtocol.device.request).not.toHaveBeenCalled()
    expect(await subject.getDeviceCrashDumpFiles()).toEqual({
      data: [],
      status: RequestResponseStatus.Ok,
    })
    // AUTO DISABLED - fix me if you like :)
    // eslint-disable-next-line @typescript-eslint/unbound-method
    expect(deviceProtocol.device.request).toHaveBeenCalled()
  })

  test("returns an `Error` status if status isn't equal to `Ok`", async () => {
    deviceProtocol.device.request = jest
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
    expect(deviceProtocol.device.request).not.toHaveBeenCalled()
    expect(await subject.getDeviceCrashDumpFiles()).toEqual({
      status: RequestResponseStatus.Error,
    })
    // AUTO DISABLED - fix me if you like :)
    // eslint-disable-next-line @typescript-eslint/unbound-method
    expect(deviceProtocol.device.request).toHaveBeenCalled()
  })
})

describe("Method: downloadDeviceCrashDumpFiles", () => {
  test("returns local files urls if `downloadDeviceFilesLocally` returns `success` status and files list exists", async () => {
    deviceProtocol.device.request = jest.fn().mockReturnValueOnce(
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
    expect(deviceProtocol.device.request).not.toHaveBeenCalled()
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
    expect(deviceProtocol.device.request).toHaveBeenCalled()
    expect(
      // AUTO DISABLED - fix me if you like :)
      // eslint-disable-next-line @typescript-eslint/unbound-method
      deviceFileSystemMock.downloadDeviceFilesLocally
    ).toHaveBeenCalledWith(["/sys/crash_dumps/crashdump.hex"], {
      cwd: "crash-dumps",
    })
  })

  test("returns an `success` status if `getDeviceFiles` returns empty data", async () => {
    deviceProtocol.device.request = jest
      .fn()
      .mockReturnValueOnce(Result.success(undefined))
    ;(
      deviceFileSystemMock.downloadDeviceFilesLocally as jest.Mock
    ).mockReturnValueOnce(Result.success([]))

    // AUTO DISABLED - fix me if you like :)
    // eslint-disable-next-line @typescript-eslint/unbound-method
    expect(deviceProtocol.device.request).not.toHaveBeenCalled()
    expect(
      // AUTO DISABLED - fix me if you like :)
      // eslint-disable-next-line @typescript-eslint/unbound-method
      deviceFileSystemMock.downloadDeviceFilesLocally
    ).not.toHaveBeenCalled()

    expect(await subject.downloadDeviceCrashDumpFiles()).toEqual({
      status: RequestResponseStatus.Ok,
      data: [],
    })

    // AUTO DISABLED - fix me if you like :)
    // eslint-disable-next-line @typescript-eslint/unbound-method
    expect(deviceProtocol.device.request).toHaveBeenCalled()
    expect(
      // AUTO DISABLED - fix me if you like :)
      // eslint-disable-next-line @typescript-eslint/unbound-method
      deviceFileSystemMock.downloadDeviceFilesLocally
    ).toHaveBeenCalled()
  })

  test("returns an `Error` status if `getDeviceFiles` returns `Error` status", async () => {
    deviceProtocol.device.request = jest
      .fn()
      .mockReturnValueOnce(Result.failed({} as AppError))

    // AUTO DISABLED - fix me if you like :)
    // eslint-disable-next-line @typescript-eslint/unbound-method
    expect(deviceProtocol.device.request).not.toHaveBeenCalled()
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
    expect(deviceProtocol.device.request).toHaveBeenCalled()
    expect(
      // AUTO DISABLED - fix me if you like :)
      // eslint-disable-next-line @typescript-eslint/unbound-method
      deviceFileSystemMock.downloadDeviceFilesLocally
    ).not.toHaveBeenCalled()
  })

  test("returns an `Error` status if `downloadDeviceFilesLocally` returns empty data", async () => {
    deviceProtocol.device.request = jest.fn().mockReturnValueOnce(
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
    expect(deviceProtocol.device.request).not.toHaveBeenCalled()
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
    expect(deviceProtocol.device.request).toHaveBeenCalled()
    expect(
      // AUTO DISABLED - fix me if you like :)
      // eslint-disable-next-line @typescript-eslint/unbound-method
      deviceFileSystemMock.downloadDeviceFilesLocally
    ).toHaveBeenCalledWith(["/sys/crash_dumps/crashdump.hex"], {
      cwd: "crash-dumps",
    })
  })

  test("returns an `Error` status if `downloadDeviceFilesLocally` returns `Error` status", async () => {
    deviceProtocol.device.request = jest.fn().mockReturnValueOnce(
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
    expect(deviceProtocol.device.request).not.toHaveBeenCalled()
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
    expect(deviceProtocol.device.request).toHaveBeenCalled()
    expect(
      // AUTO DISABLED - fix me if you like :)
      // eslint-disable-next-line @typescript-eslint/unbound-method
      deviceFileSystemMock.downloadDeviceFilesLocally
    ).toHaveBeenCalledWith(["/sys/crash_dumps/crashdump.hex"], {
      cwd: "crash-dumps",
    })
  })
})
