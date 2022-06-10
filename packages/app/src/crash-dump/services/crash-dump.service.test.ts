/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { CrashDumpService } from "App/crash-dump/services/crash-dump.service"
import DeviceService from "App/__deprecated__/backend/device-service"
import { DeviceFileSystem } from "App/__deprecated__/backend/adapters/device-file-system/device-file-system.adapter"
import { RequestResponseStatus } from "App/core/types/request-response.interface"

const deviceServiceMock = {
  request: jest.fn(),
} as unknown as DeviceService

const deviceFileSystemMock = {
  downloadDeviceFilesLocally: jest.fn(),
} as unknown as DeviceFileSystem

const subject = new CrashDumpService(deviceServiceMock, deviceFileSystemMock)

afterEach(() => {
  jest.resetAllMocks()
})

describe("Method: getDeviceCrashDumpFiles", () => {
  test("returns list of files if `Endpoint.DeviceInfo` endpoint returns `success` and list of files", async () => {
    ;(deviceServiceMock.request as jest.Mock).mockReturnValueOnce({
      status: RequestResponseStatus.Ok,
      data: {
        files: ["/sys/crash_dumps/crashdump.hex"],
      },
    })

    expect(deviceServiceMock.request).not.toHaveBeenCalled()
    expect(await subject.getDeviceCrashDumpFiles()).toEqual({
      data: ["/sys/crash_dumps/crashdump.hex"],
      status: RequestResponseStatus.Ok,
    })
    expect(deviceServiceMock.request).toHaveBeenCalled()
  })

  test("returns an `Error` status if data key isn't exists", async () => {
    ;(deviceServiceMock.request as jest.Mock).mockReturnValueOnce({
      status: RequestResponseStatus.Ok,
      data: undefined,
    })

    expect(deviceServiceMock.request).not.toHaveBeenCalled()
    expect(await subject.getDeviceCrashDumpFiles()).toEqual({
      status: RequestResponseStatus.Error,
    })
    expect(deviceServiceMock.request).toHaveBeenCalled()
  })

  test("returns an `Error` status if status isn't equal to `Ok`", async () => {
    ;(deviceServiceMock.request as jest.Mock).mockReturnValueOnce({
      status: RequestResponseStatus.Error,
      data: undefined,
    })

    expect(deviceServiceMock.request).not.toHaveBeenCalled()
    expect(await subject.getDeviceCrashDumpFiles()).toEqual({
      status: RequestResponseStatus.Error,
    })
    expect(deviceServiceMock.request).toHaveBeenCalled()
  })
})

describe("Method: downloadDeviceCrashDumpFiles", () => {
  test("returns local files urls if `downloadDeviceFilesLocally` returns `success` status and files list exists", async () => {
    ;(deviceServiceMock.request as jest.Mock).mockReturnValueOnce({
      status: RequestResponseStatus.Ok,
      data: {
        files: ["/sys/crash_dumps/crashdump.hex"],
      },
    })
    ;(
      deviceFileSystemMock.downloadDeviceFilesLocally as jest.Mock
    ).mockReturnValueOnce({
      status: RequestResponseStatus.Ok,
      data: ["C:/MuditaOs/crash-dumps/crashdump.hex"],
    })

    expect(deviceServiceMock.request).not.toHaveBeenCalled()
    expect(
      deviceFileSystemMock.downloadDeviceFilesLocally
    ).not.toHaveBeenCalled()

    expect(await subject.downloadDeviceCrashDumpFiles()).toEqual({
      data: ["C:/MuditaOs/crash-dumps/crashdump.hex"],
      status: RequestResponseStatus.Ok,
    })

    expect(deviceServiceMock.request).toHaveBeenCalled()
    expect(
      deviceFileSystemMock.downloadDeviceFilesLocally
    ).toHaveBeenCalledWith(["/sys/crash_dumps/crashdump.hex"], {
      cwd: "crash-dumps",
    })
  })

  test("returns an `Error` status if `getDeviceFiles` returns empty data", async () => {
    ;(deviceServiceMock.request as jest.Mock).mockReturnValueOnce({
      status: RequestResponseStatus.Ok,
      data: undefined,
    })

    expect(deviceServiceMock.request).not.toHaveBeenCalled()
    expect(
      deviceFileSystemMock.downloadDeviceFilesLocally
    ).not.toHaveBeenCalled()

    expect(await subject.downloadDeviceCrashDumpFiles()).toEqual({
      status: RequestResponseStatus.Error,
    })

    expect(deviceServiceMock.request).toHaveBeenCalled()
    expect(
      deviceFileSystemMock.downloadDeviceFilesLocally
    ).not.toHaveBeenCalled()
  })

  test("returns an `Error` status if `getDeviceFiles` returns `Error` status", async () => {
    ;(deviceServiceMock.request as jest.Mock).mockReturnValueOnce({
      status: RequestResponseStatus.Error,
    })

    expect(deviceServiceMock.request).not.toHaveBeenCalled()
    expect(
      deviceFileSystemMock.downloadDeviceFilesLocally
    ).not.toHaveBeenCalled()

    expect(await subject.downloadDeviceCrashDumpFiles()).toEqual({
      status: RequestResponseStatus.Error,
    })

    expect(deviceServiceMock.request).toHaveBeenCalled()
    expect(
      deviceFileSystemMock.downloadDeviceFilesLocally
    ).not.toHaveBeenCalled()
  })

  test("returns an `Error` status if `downloadDeviceFilesLocally` returns empty data", async () => {
    ;(deviceServiceMock.request as jest.Mock).mockReturnValueOnce({
      status: RequestResponseStatus.Ok,
      data: {
        files: ["/sys/crash_dumps/crashdump.hex"],
      },
    })
    ;(
      deviceFileSystemMock.downloadDeviceFilesLocally as jest.Mock
    ).mockReturnValueOnce({
      status: RequestResponseStatus.Ok,
      data: undefined,
    })

    expect(deviceServiceMock.request).not.toHaveBeenCalled()
    expect(
      deviceFileSystemMock.downloadDeviceFilesLocally
    ).not.toHaveBeenCalled()

    expect(await subject.downloadDeviceCrashDumpFiles()).toEqual({
      status: RequestResponseStatus.Error,
    })

    expect(deviceServiceMock.request).toHaveBeenCalled()
    expect(
      deviceFileSystemMock.downloadDeviceFilesLocally
    ).toHaveBeenCalledWith(["/sys/crash_dumps/crashdump.hex"], {
      cwd: "crash-dumps",
    })
  })

  test("returns an `Error` status if `downloadDeviceFilesLocally` returns `Error` status", async () => {
    ;(deviceServiceMock.request as jest.Mock).mockReturnValueOnce({
      status: RequestResponseStatus.Ok,
      data: {
        files: ["/sys/crash_dumps/crashdump.hex"],
      },
    })
    ;(
      deviceFileSystemMock.downloadDeviceFilesLocally as jest.Mock
    ).mockReturnValueOnce({
      status: RequestResponseStatus.Error,
    })

    expect(deviceServiceMock.request).not.toHaveBeenCalled()
    expect(
      deviceFileSystemMock.downloadDeviceFilesLocally
    ).not.toHaveBeenCalled()

    expect(await subject.downloadDeviceCrashDumpFiles()).toEqual({
      status: RequestResponseStatus.Error,
    })

    expect(deviceServiceMock.request).toHaveBeenCalled()
    expect(
      deviceFileSystemMock.downloadDeviceFilesLocally
    ).toHaveBeenCalledWith(["/sys/crash_dumps/crashdump.hex"], {
      cwd: "crash-dumps",
    })
  })
})
