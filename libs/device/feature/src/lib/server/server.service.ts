/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import https from "https"
import axios, { Axios } from "axios"
import { MuditaCenterServerRoutes } from "shared/utils"
import { Result, ResultObject } from "Core/core/builder"
import { AppError } from "Core/core/errors"
import { IpcEvent } from "Core/core/decorators"
import {
  APIServerServiceEvents,
  GeneralError,
  ServerAPIDeviceOSVersion,
  ServerAPIDeviceOSVersionValidator,
} from "device/models"

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
        MuditaCenterServerRoutes.GetApiDeviceOsVersion,
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
