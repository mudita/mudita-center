/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { CaseColour, Endpoint, Method } from "@mudita/pure"
import DeviceService from "App/__deprecated__/backend/device-service"
import DeviceBaseInfoAdapter from "App/__deprecated__/backend/adapters/device-base-info/device-base-info-adapter.class"
import DeviceInfo from "App/__deprecated__/common/interfaces/device-info.interface"
import CryptoFileService from "App/file-system/services/crypto-file-service/crypto-file-service"
import {
  RequestResponse,
  RequestResponseStatus,
} from "App/core/types/request-response.interface"

// TODO move those logic to DeviceModule.getDeviceInfo()
let token: string

const createToken = (): string => {
  if (!token) {
    token = CryptoFileService.createToken({
      key: Math.random().toString(36).slice(-8),
    })
  }

  return token
}

export const getDeviceInfoRequest = async (
  deviceService: DeviceService
): Promise<RequestResponse<DeviceInfo>> => {
  const { status, data } = await deviceService.request({
    endpoint: Endpoint.DeviceInfo,
    method: Method.Get,
  })

  if (status !== RequestResponseStatus.Ok || data === undefined) {
    return {
      status,
      error: { message: "Get Device Info: Something went wrong" },
    }
  } else {
    const deviceToken = data.deviceToken
      ? data.deviceToken.substr(0, 32)
      : createToken()

    return {
      status,
      data: {
        deviceToken,
        osVersion: data.version,
        serialNumber: data.serialNumber,
        caseColour: data.caseColour ? data.caseColour : CaseColour.Gray,
        backupFilePath: data.backupFilePath ? data.backupFilePath : "",
      },
    }
  }
}

export class DeviceBaseInfo extends DeviceBaseInfoAdapter {
  constructor(private deviceService: DeviceService) {
    super()
  }

  public async getDeviceInfo(): Promise<RequestResponse<DeviceInfo>> {
    return getDeviceInfoRequest(this.deviceService)
  }
}

const createDeviceBaseInfoAdapter = (
  deviceService: DeviceService
): DeviceBaseInfoAdapter => new DeviceBaseInfo(deviceService)

export default createDeviceBaseInfoAdapter
