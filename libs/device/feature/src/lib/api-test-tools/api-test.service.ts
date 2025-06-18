/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { DeviceProtocol } from "device-protocol/feature"
import { Result, ResultObject } from "Core/core/builder"
import { AppError } from "Core/core/errors"
import {
  GeneralError,
  ApiTestServiceEvents,
  ApiSerialPortTestData,
  ApiSerialPortTestDataValidator,
} from "device/models"
import { IpcEvent } from "Core/core/decorators"

export class ApiTestToolsService {
  constructor(private deviceProtocol: DeviceProtocol) {}

  @IpcEvent(ApiTestServiceEvents.SendSerialPortTestData)
  public sendTestData({
    deviceId,
    data,
  }: {
    deviceId?: string
    data: string
  }): Promise<ResultObject<ApiSerialPortTestData>> {
    return this.sendSerialPortTestDataRequest(
      "send-serial-port-test-data",
      data,
      { deviceId }
    )
  }

  private async sendSerialPortTestDataRequest(
    action: string,
    data: string,
    { deviceId }: { deviceId?: string } = {}
  ): Promise<ResultObject<ApiSerialPortTestData>> {
    const device = deviceId
      ? this.deviceProtocol.getAPIDeviceById(deviceId)
      : this.deviceProtocol.apiDevice

    if (!device) {
      return Result.failed(new AppError(GeneralError.NoDevice, ""))
    }

    const response = await device.request({
      endpoint: "API_TEST_DATA",
      method: "GET",
      body: {
        action,
        data,
      },
    })

    if (response.ok) {
      const validatedData = ApiSerialPortTestDataValidator.safeParse(
        response.data.body
      )
      if (validatedData.success) {
        return Result.success(validatedData.data)
      } else {
        return Result.failed(new AppError(GeneralError.IncorrectResponse, ""))
      }
    }

    return Result.failed(response.error)
  }
}
