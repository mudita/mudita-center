/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import PurePhoneAdapter from "Backend/adapters/pure-phone/pure-phone-adapter.class"
import DeviceResponse, {
  DeviceResponseStatus,
} from "Backend/adapters/device-response.interface"
import { osVersion } from "App/main/default-app-configuration.json"
import { GetPhoneLockTimeResponseBody } from "@mudita/pure"

class PurePhoneFakeAdapter extends PurePhoneAdapter {
  public getModelName(): string {
    return "Ziemniaczek Puree"
  }

  public getModelNumber(): string {
    return "Y0105W4GG1N5"
  }

  public getName(): string {
    return "Mudita Pure"
  }

  public getOsUpdateDate(): string {
    return "2020-01-14T11:31:08.244Z"
  }

  public async getOsVersion(): Promise<DeviceResponse<string>> {
    return {
      status: DeviceResponseStatus.Ok,
      data: osVersion,
    }
  }

  public async getSerialNumber(): Promise<DeviceResponse<string>> {
    return {
      status: DeviceResponseStatus.Ok,
      data: "1UB13213MN14K1",
    }
  }

  public async getCaseColour(): Promise<DeviceResponse<string>> {
    return {
      status: DeviceResponseStatus.Ok,
      data: "gray",
    }
  }

  public async disconnectDevice(): Promise<DeviceResponse> {
    return {
      status: DeviceResponseStatus.Ok,
    }
  }

  public async connectDevice(): Promise<DeviceResponse> {
    return {
      status: DeviceResponseStatus.Ok,
    }
  }

  public async unlockDevice(): Promise<DeviceResponse> {
    return {
      status: DeviceResponseStatus.Ok,
    }
  }

  public async getUnlockDeviceStatus(): Promise<DeviceResponse> {
    return {
      status: DeviceResponseStatus.Ok,
    }
  }

  public async getDeviceLockTime(): Promise<DeviceResponse<GetPhoneLockTimeResponseBody>> {
    return {
      status: DeviceResponseStatus.Ok,
      data: {phoneLockTime: 1630703219}
    }
  }

  public async getDeviceLogs(): Promise<DeviceResponse<string>> {
    return {
      status: DeviceResponseStatus.Ok,
      data: "Hello, World",
    }
  }

  public async updateOs(): Promise<DeviceResponse> {
    return {
      status: DeviceResponseStatus.Ok,
    }
  }
}

const createFakePurePhoneAdapter = (): PurePhoneAdapter =>
  new PurePhoneFakeAdapter()

export default createFakePurePhoneAdapter
