/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { Result, ResultObject } from "Core/core/builder"
import { IpcEvent } from "Core/core/decorators"
import { AppError } from "Core/core/errors"
import { DeviceProtocol } from "device-protocol/feature"
import { DeviceId } from "Core/device/constants/device-id"
import { ApiResponse } from "Core/device/types/mudita-os"
import {
  APIDataTransferServiceEvents,
  DataTransferDomain,
  DataTransferValidator200,
  DataTransferValidator202,
  GeneralError,
  PreDataTransfer,
  PreDataTransferValidator,
  DataTransfer,
} from "device/models"
import random from "lodash/random"

export class APIDataTransferService {
  constructor(private deviceProtocol: DeviceProtocol) {}

  @IpcEvent(APIDataTransferServiceEvents.StartPreDataTransfer)
  public async startPreDataTransfer({
    domains,
    deviceId,
  }: {
    domains: DataTransferDomain[]
    deviceId?: DeviceId
  }): Promise<ResultObject<PreDataTransfer>> {
    const device = deviceId
      ? this.deviceProtocol.getAPIDeviceById(deviceId)
      : this.deviceProtocol.apiDevice

    if (!device) {
      return Result.failed(new AppError(GeneralError.NoDevice, ""))
    }

    const dataTransferId = random(1, 100000)

    const response = await device.request({
      endpoint: "PRE_DATA_TRANSFER",
      method: "POST",
      body: {
        dataTransferId,
        domains,
      },
    })

    if (response.ok) {
      const startDataTransferResponse = PreDataTransferValidator(
        domains
      ).safeParse(response.data.body)

      return startDataTransferResponse.success
        ? Result.success(startDataTransferResponse.data)
        : Result.failed(new AppError(GeneralError.IncorrectResponse, ""))
    }

    return Result.failed(new AppError(GeneralError.IncorrectResponse))
  }

  @IpcEvent(APIDataTransferServiceEvents.CheckDataTransfer)
  public async checkDataTransfer({
    dataTransferId,
    deviceId,
  }: {
    dataTransferId: number
    deviceId?: DeviceId
  }): Promise<ResultObject<DataTransfer>> {
    const device = deviceId
      ? this.deviceProtocol.getAPIDeviceById(deviceId)
      : this.deviceProtocol.apiDevice

    if (!device) {
      return Result.failed(new AppError(GeneralError.NoDevice, ""))
    }

    const response = await device.request({
      endpoint: "DATA_TRANSFER",
      method: "GET",
      body: {
        dataTransferId,
      },
    })

    return this.parseDataTransferResponse(response)
  }

  @IpcEvent(APIDataTransferServiceEvents.StartDataTransfer)
  public async startDataTransfer({
    dataTransferId,
    deviceId,
  }: {
    dataTransferId: number
    deviceId?: DeviceId
  }): Promise<ResultObject<DataTransfer>> {
    const device = deviceId
      ? this.deviceProtocol.getAPIDeviceById(deviceId)
      : this.deviceProtocol.apiDevice

    if (!device) {
      return Result.failed(new AppError(GeneralError.NoDevice, ""))
    }

    const response = await device.request({
      endpoint: "DATA_TRANSFER",
      method: "POST",
      body: {
        dataTransferId,
      },
    })

    return this.parseDataTransferResponse(response)
  }

  @IpcEvent(APIDataTransferServiceEvents.CancelDataTransfer)
  public async cancelDataTransfer({
    dataTransferId,
    deviceId,
  }: {
    dataTransferId: number
    deviceId?: DeviceId
  }): Promise<ResultObject<undefined>> {
    const device = deviceId
      ? this.deviceProtocol.getAPIDeviceById(deviceId)
      : this.deviceProtocol.apiDevice

    if (!device) {
      return Result.failed(new AppError(GeneralError.NoDevice, ""))
    }

    const response = await device.request({
      endpoint: "DATA_TRANSFER",
      method: "DELETE",
      body: {
        dataTransferId,
      },
    })

    if (response.ok) {
      return Result.success(undefined)
    }

    return Result.failed(new AppError(GeneralError.IncorrectResponse))
  }

  private parseDataTransferResponse(
    response: ResultObject<ApiResponse<unknown>, string | number, unknown>
  ) {
    if (!response.ok) {
      return Result.failed(response.error)
    }

    if (response.data.status === 200) {
      const response200 = DataTransferValidator200.safeParse(response.data.body)
      if (response200.success) {
        return Result.success({ ...response200.data, status: 200 })
      }
      return Result.success({
        ...(response.data.body as DataTransfer),
        status: 200,
      })
    }
    if (response.data.status === 202) {
      const response202 = DataTransferValidator202.safeParse(response.data.body)

      if (response202.success) {
        return Result.success({ ...response202.data, status: 202 })
      }
      return Result.success({
        ...(response.data.body as DataTransfer),
        status: 202,
      })
    }

    return Result.failed(new AppError(GeneralError.IncorrectResponse, ""))
  }
}
