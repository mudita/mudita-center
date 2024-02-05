/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import https from "https"
import axios, { Axios } from "axios"
import { Result, ResultObject } from "Core/core/builder"
import { AppError } from "Core/core/errors"
import { IpcEvent } from "Core/core/decorators"
import {
  APIServerServiceEvents,
  ServerAPIDeviceOSVersion,
  ServerAPIDeviceOSVersionValidator,
} from "device/models"
import { GeneralError } from "../general-error"

export class ServerService {
  private axiosInstance: Axios

  constructor() {
    this.axiosInstance = axios.create({
      baseURL: process.env.MUDITA_CENTER_SERVER_URL,
      httpsAgent: new https.Agent({
        rejectUnauthorized: false,
      }),
    })
  }

  @IpcEvent(APIServerServiceEvents.GetAPIDeviceOSVersion)
  public async getAPIDeviceOSVersion({
    vendorId,
    productId,
  }: {
    vendorId: string
    productId: string
  }): Promise<ResultObject<ServerAPIDeviceOSVersion>> {
    try {
      const response = await this.axiosInstance.get<ServerAPIDeviceOSVersion>(
        `get-api-device-os-version`,
        {
          params: {
            vendorId,
            productId,
          },
        }
      )

      const serverAPIDeviceOSVersion =
        ServerAPIDeviceOSVersionValidator.safeParse(response.data)

      if (response.status === 200 && serverAPIDeviceOSVersion.success) {
        return Result.success(serverAPIDeviceOSVersion.data)
      }
      return Result.failed(new AppError(GeneralError.IncorrectResponse))
    } catch (error) {
      return Result.failed(new AppError(GeneralError.IncorrectResponse))
    }
  }
}
