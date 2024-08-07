/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { Result, ResultObject } from "Core/core/builder"
import { AppError } from "Core/core/errors"
import { DiagnosticsFileList } from "Core/device/constants"
import { DeviceCommunicationError, Endpoint, Method } from "core-device/models"
import { GetDeviceFilesResponseBody } from "Core/device/types/mudita-os"
import { DeviceLogService } from "Core/device-log/services/device-log.service"
import { DeviceEnumError } from "Core/device-log/constants"
import { DeviceProtocol } from "device-protocol/feature"
import { DeviceFileSystemService } from "Core/device-file-system/services"
import { RequestResponseStatus } from "Core/core/types/request-response.interface"
import {
  firstsPartDecodeLog,
  secondsPartDecodeLog,
} from "Root/jest/testing-support/mocks/diagnostic-data.mock"

const deviceProtocol = {
  device: {
    request: jest.fn(),
  },
} as unknown as DeviceProtocol

const deviceFileSystemMock = {
  downloadDeviceFiles: jest.fn(),
} as unknown as DeviceFileSystemService

const subject = new DeviceLogService(deviceProtocol, deviceFileSystemMock)

const deviceInfoErrorResponse: ResultObject<unknown> = Result.failed(
  new AppError(DeviceCommunicationError.RequestFailed, "Something went wrong", {
    status: RequestResponseStatus.Error,
  })
)

const deviceInfoSuccessResponse: ResultObject<GetDeviceFilesResponseBody> =
  Result.success({ files: ["/usr/log/log.hex"] })

describe("Method: `downloadDeviceLogs`", () => {
  test("returns Result.failed if DeviceInfo endpoint response with error", async () => {
    deviceProtocol.device.request = jest
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
    expect(deviceProtocol.device.request).toHaveBeenLastCalledWith({
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
    deviceProtocol.device.request = jest
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
    expect(deviceProtocol.device.request).toHaveBeenLastCalledWith({
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
    deviceProtocol.device.request = jest
      .fn()
      .mockResolvedValueOnce(deviceInfoSuccessResponse)
    deviceFileSystemMock.downloadDeviceFiles = jest.fn().mockResolvedValueOnce(
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
