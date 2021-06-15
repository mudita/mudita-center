/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import PurePhoneAdapter from "Backend/adapters/pure-phone/pure-phone-adapter.class"
import DeviceResponse, {
  DeviceResponseStatus,
} from "Backend/adapters/device-response.interface"

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
      data: "release-0.55.1",
    }
  }

  public getSerialNumber(): string {
    return "1UB13213MN14K1"
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

  public async importDeviceErrorFile(): Promise<DeviceResponse> {
    return {
      status: DeviceResponseStatus.Ok,
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
