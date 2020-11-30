import PurePhoneNetworkAdapter from "Backend/adapters/pure-phone-network/pure-phone-network-adapter.class"
import SimInfo from "Common/interfaces/sim-info.interface"
import DeviceResponse, {
  DeviceResponseStatus,
} from "Backend/adapters/device-response.interface"
import DeviceService from "Backend/device-service"
import { Endpoint, Method, SIM } from "pure"

class PurePhoneNetwork extends PurePhoneNetworkAdapter {
  constructor(private deviceService: DeviceService) {
    super()
  }

  public async getSimCards(): Promise<DeviceResponse<SimInfo[]>> {
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
            carrier: "Yo mama 36.0",
            networkLevel: Number((Number(data.signalStrength) / 5).toFixed(2)),
            iccid: 1234,
            imei: 5678,
            meid: 8765,
            seid: "1234",
          },
        ]
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
