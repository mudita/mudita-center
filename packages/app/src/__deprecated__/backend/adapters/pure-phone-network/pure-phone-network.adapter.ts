/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import PurePhoneNetworkAdapter from "App/__deprecated__/backend/adapters/pure-phone-network/pure-phone-network-adapter.class"
import DeviceService from "App/__deprecated__/backend/device-service"
import { Endpoint, Method, SIM } from "App/device/constants"
import { SimCard } from "App/__deprecated__/renderer/models/basic-info/basic-info.typings"
import {
  RequestResponse,
  RequestResponseStatus,
} from "App/core/types/request-response.interface"

class PurePhoneNetwork extends PurePhoneNetworkAdapter {
  constructor(private deviceService: DeviceService) {
    super()
  }

  //TODO: handle mocked fields when API will be ready -> https://appnroll.atlassian.net/browse/PDA-590
  public async getSimCards(): Promise<RequestResponse<SimCard[]>> {
    const { status, data } = await this.deviceService.request({
      endpoint: Endpoint.DeviceInfo,
      method: Method.Get,
    })

    if (status === RequestResponseStatus.Ok && data) {
      return {
        status,
        data: [
          {
            slot: data.selectedSim === SIM.One ? 1 : 2,
            active: true,
            number: 12345678,
            network: data.networkOperatorName,
            networkLevel: Number((Number(data.signalStrength) / 4).toFixed(2)),
          },
        ],
      }
    } else {
      return { status, error: { message: "GetSimCards: Something went wrong" } }
    }
  }

  public setActiveCard(): RequestResponse {
    return {
      status: RequestResponseStatus.Ok,
    }
  }
}

const createPurePhoneNetwork = (
  deviceService: DeviceService
): PurePhoneNetworkAdapter => new PurePhoneNetwork(deviceService)

export default createPurePhoneNetwork
