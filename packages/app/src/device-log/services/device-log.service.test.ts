/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { Result } from "App/core/builder"
import { AppError } from "App/core/errors"
import { Endpoint, Method, DiagnosticsFileList } from "App/device/constants"
import { GetDeviceFilesResponseBody } from "App/device/types/mudita-os"
import { DeviceLogService } from "App/device-log/services/device-log.service"
import { DeviceEnumError } from "App/device-log/constants"
import DeviceService from "App/__deprecated__/backend/device-service"
import { DeviceFileSystemService } from "App/device-file-system/services"
import {
  RequestResponse,
  RequestResponseStatus,
} from "App/core/types/request-response.interface"
import {
  firstsPartDecodeLog,
  secondsPartDecodeLog,
} from "App/testing-support/mocks/diagnostic-data.mock"

jest.mock("App/__deprecated__/backend/device-service")

const deviceServiceMock = {
  request: jest.fn(),
} as unknown as DeviceService

const deviceFileSystemMock = {
  downloadDeviceFiles: jest.fn(),
} as unknown as DeviceFileSystemService

const subject = new DeviceLogService(deviceServiceMock, deviceFileSystemMock)

const deviceInfoErrorResponse: RequestResponse = {
  status: RequestResponseStatus.Error,
}

const deviceInfoSuccessResponse: RequestResponse<GetDeviceFilesResponseBody> = {
  status: RequestResponseStatus.Ok,
  data: {
    files: ["/usr/log/log.hex"],
  },
}

describe("Method: `downloadDeviceLogs`", () => {
  test("returns Result.failed if DeviceInfo endpoint response with error", async () => {
    deviceServiceMock.request = jest
      .fn()
      .mockResolvedValueOnce(deviceInfoErrorResponse)

    const result = await subject.downloadDeviceLogs()

    expect(result).toEqual(
      Result.failed(
        new AppError(
          DeviceEnumError.CannotGetDeviceLogLocation,
          "Device log file location is empty"
        )
      )
    )
    // AUTO DISABLED - fix me if you like :)
    // eslint-disable-next-line @typescript-eslint/unbound-method
    expect(deviceServiceMock.request).toHaveBeenLastCalledWith({
      endpoint: Endpoint.DeviceInfo,
      method: Method.Get,
      body: {
        fileList: DiagnosticsFileList.LOGS,
      },
    })
    // AUTO DISABLED - fix me if you like :)
    // eslint-disable-next-line @typescript-eslint/unbound-method
    expect(deviceFileSystemMock.downloadDeviceFiles).not.toHaveBeenCalled()
  })

  test("returns Result.failed if `downloadDeviceFiles` returns empty data", async () => {
    deviceServiceMock.request = jest
      .fn()
      .mockResolvedValueOnce(deviceInfoSuccessResponse)
    deviceFileSystemMock.downloadDeviceFiles = jest
      .fn()
      .mockResolvedValueOnce({ data: undefined })

    const result = await subject.downloadDeviceLogs()

    expect(result).toEqual(
      Result.failed(
        new AppError(
          DeviceEnumError.CannotDownloadLogFileFromDevice,
          "Error during download files from device"
        )
      )
    )
    // AUTO DISABLED - fix me if you like :)
    // eslint-disable-next-line @typescript-eslint/unbound-method
    expect(deviceServiceMock.request).toHaveBeenLastCalledWith({
      endpoint: Endpoint.DeviceInfo,
      method: Method.Get,
      body: {
        fileList: DiagnosticsFileList.LOGS,
      },
    })
    // AUTO DISABLED - fix me if you like :)
    // eslint-disable-next-line @typescript-eslint/unbound-method
    expect(deviceFileSystemMock.downloadDeviceFiles).toHaveBeenLastCalledWith([
      "/usr/log/log.hex",
    ])
  })

  test("returns Result.success if `downloadDeviceFiles` returns file data", async () => {
    deviceServiceMock.request = jest
      .fn()
      .mockResolvedValueOnce(deviceInfoSuccessResponse)
    deviceFileSystemMock.downloadDeviceFiles = jest
      .fn()
      .mockResolvedValueOnce(
        Result.success([
          {
            name: "log.hex",
            data: `${firstsPartDecodeLog}${secondsPartDecodeLog}`,
          },
        ])
      )

    const result = await subject.downloadDeviceLogs()

    expect(result).toEqual(
      Result.success([
        {
          name: "log.hex",
          data: `${firstsPartDecodeLog}${secondsPartDecodeLog}`,
        },
      ])
    )
  })
})
