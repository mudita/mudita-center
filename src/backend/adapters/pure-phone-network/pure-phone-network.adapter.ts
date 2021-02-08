/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/LICENSE.md
 */

import PurePhoneNetworkAdapter from "Backend/adapters/pure-phone-network/pure-phone-network-adapter.class"
import DeviceResponse, {
  DeviceResponseStatus,
} from "Backend/adapters/device-response.interface"
import DeviceService from "Backend/device-service"
import { Endpoint, Method, SIM } from "pure"
import { SimCard } from "Renderer/models/basic-info/basic-info.typings"

class PurePhoneNetwork extends PurePhoneNetworkAdapter {
  constructor(private deviceService: DeviceService) {
    super()
  }

  //TODO: handle mocked fields when API will be ready -> https://appnroll.atlassian.net/browse/PDA-590
  public async getSimCards(): Promise<DeviceResponse<SimCard[]>> {
    const { status, data } = await this.deviceService.request({
      endpoint: Endpoint.DeviceInfo,
      method: Method.Get,
    })

    if (status === DeviceResponseStatus.Ok && data) {
      return {
        status,
        data: [
          {
            slot: data.selectedSim === SIM.One ? 1 : 2,
            active: true,
            number: 12345678,
            network: "Y-Mobile",
            networkLevel: Number((Number(data.signalStrength) / 5).toFixed(2)),
          },
        ],
      }
    } else {
      return { status, error: { message: "Something went wrong" } }
    }
  }

  public setActiveCard(): DeviceResponse {
    return {
      status: DeviceResponseStatus.Ok,
    }
  }
}

const createPurePhoneNetwork = (
  deviceService: DeviceService
): PurePhoneNetworkAdapter => new PurePhoneNetwork(deviceService)

export default createPurePhoneNetwork
