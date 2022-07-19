/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import PurePhoneNetworkAdapter from "App/__deprecated__/backend/adapters/pure-phone-network/pure-phone-network-adapter.class"
import { SimCard } from "App/__deprecated__/renderer/models/basic-info/basic-info.typings"
import {
  RequestResponse,
  RequestResponseStatus,
} from "App/core/types/request-response.interface"

class PurePhoneNetworkFake extends PurePhoneNetworkAdapter {
  // AUTO DISABLED - fix me if you like :)
  // eslint-disable-next-line @typescript-eslint/require-await
  public async getSimCards(): Promise<RequestResponse<SimCard[]>> {
    return {
      status: RequestResponseStatus.Ok,
      data: [
        {
          slot: 1,
          active: true,
          number: 12345678,
          network: "Y-Mobile",
          networkLevel: 0.5,
        },
        {
          slot: 2,
          active: false,
          number: 7001234523,
          network: "X-Mobile",
          networkLevel: 0.69,
        },
      ],
    }
  }

  public setActiveCard(): RequestResponse {
    return {
      status: RequestResponseStatus.Ok,
    }
  }
}

const createFakePurePhoneNetworkAdapter = (): PurePhoneNetworkAdapter =>
  new PurePhoneNetworkFake()

export default createFakePurePhoneNetworkAdapter
