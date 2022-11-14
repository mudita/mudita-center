/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import {
  GetRestoreDeviceStatusRequestConfig,
  GetPhoneLockTimeResponseBody,
  GetRestoreDeviceStatusResponseBody,
  StartRestoreRequestConfig,
} from "App/device/types/mudita-os"
import { Device } from "App/device/modules/device"
import { Endpoint, Method, PhoneLockCategory } from "App/device/constants"
import PurePhoneAdapter from "App/__deprecated__/backend/adapters/pure-phone/pure-phone-adapter.class"
import DeviceService from "App/__deprecated__/backend/device-service"
import {
  RequestResponse,
  RequestResponseStatus,
} from "App/core/types/request-response.interface"

class PurePhone extends PurePhoneAdapter {
  constructor(private deviceService: DeviceService) {
    super()
  }

  public disconnectDevice(): Promise<RequestResponse> {
    return this.deviceService.disconnect()
  }

  public connectDevice(): Promise<RequestResponse<Device>> {
    return this.deviceService.connect()
  }

  public async unlockDevice(code: string): Promise<RequestResponse> {
    return await this.deviceService.request({
      endpoint: Endpoint.Security,
      method: Method.Put,
      body: {
        phoneLockCode: code,
      },
    })
  }

  public async getDeviceLockTime(): Promise<
    RequestResponse<GetPhoneLockTimeResponseBody>
  > {
    const { status, data } = await this.deviceService.request({
      endpoint: Endpoint.Security,
      method: Method.Get,
      body: { category: PhoneLockCategory.Time },
    })
    if (status === RequestResponseStatus.Ok && data) {
      return {
        status,
        data: data,
      }
    } else if (status === RequestResponseStatus.UnprocessableEntity) {
      return {
        status,
        error: {
          message:
            "Get device lock time: phone is unlocked or unlocking phone is possible in this moment",
        },
      }
    } else {
      return {
        status,
        error: { message: "Get device lock time: Something went wrong" },
      }
    }
  }

  public async getUnlockDeviceStatus(): Promise<RequestResponse> {
    return await this.deviceService.request({
      endpoint: Endpoint.Security,
      method: Method.Get,
      body: { category: PhoneLockCategory.Status },
    })
  }

  public async startRestoreDevice(
    config: StartRestoreRequestConfig["body"]
  ): Promise<RequestResponse> {
    return await this.deviceService.request({
      endpoint: Endpoint.Restore,
      method: Method.Post,
      body: config,
    })
  }

  public async getRestoreDeviceStatus(
    config: GetRestoreDeviceStatusRequestConfig["body"]
  ): Promise<RequestResponse<GetRestoreDeviceStatusResponseBody>> {
    return await this.deviceService.request({
      endpoint: Endpoint.Restore,
      method: Method.Get,
      body: config,
    })
  }
}

const createPurePhoneAdapter = (
  deviceService: DeviceService
): PurePhoneAdapter => new PurePhone(deviceService)

export default createPurePhoneAdapter
