import PurePhoneNetworkAdapter from "Backend/adapters/pure-phone-network/pure-phone-network-adapter.class"
import DeviceResponse, {
  DeviceResponseStatus,
} from "Backend/adapters/device-response.interface"
import { SimCard } from "Renderer/models/basic-info/basic-info.typings"

class PurePhoneNetworkFake extends PurePhoneNetworkAdapter {
  public async getSimCards(): Promise<DeviceResponse<SimCard[]>> {
    return {
      status: DeviceResponseStatus.Ok,
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

  public setActiveCard(): DeviceResponse {
    return {
      status: DeviceResponseStatus.Ok,
    }
  }
}

const createFakePurePhoneNetworkAdapter = (): PurePhoneNetworkAdapter =>
  new PurePhoneNetworkFake()

export default createFakePurePhoneNetworkAdapter
