import PurePhoneNetworkAdapter from "Backend/adapters/pure-phone-network/pure-phone-network-adapter.class"
import SimInfo from "Common/interfaces/sim-info.interface"
import DeviceResponse, {
  DeviceResponseStatus,
} from "Backend/adapters/device-response.interface"

class PurePhoneNetworkFake extends PurePhoneNetworkAdapter {
  public getSimCards(): SimInfo[] {
    return [
      {
        slot: 1,
        active: true,
        number: 12345678,
        network: "Y-Mobile",
        carrier: "Yo mama 36.0",
        networkLevel: 0.5,
        iccid: 1234,
        imei: 5678,
        meid: 8765,
        seid: "1234",
      },
      {
        slot: 2,
        active: false,
        number: 7001234523,
        network: "X-Mobile",
        carrier: "X-Mobile 69",
        networkLevel: 0.69,
        iccid: 412,
        imei: 42,
        meid: 1410,
        seid: "x123",
      },
    ]
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
