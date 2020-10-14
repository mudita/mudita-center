import PurePhoneAdapter from "Backend/adapters/pure-phone/pure-phone-adapter.class"
import DeviceResponse, {
  DeviceResponseStatus,
} from "Backend/adapters/device-response.interface"
import { PurePhoneFakeAdapter } from "Backend/adapters/pure-phone/pure-phone-fake.adapter"

class PurePhone extends PurePhoneFakeAdapter {
  constructor(private pureNode: any) {
    super()
  }

  public connectDevice(): Promise<DeviceResponse> {
    return new Promise((resolve) => {
      this.pureNode.connect
      this.pureNode.portInit((phones: any[]) => {
        this.pureNode.init(phones[0].path)
        resolve({ status: DeviceResponseStatus.Ok })
      })
    })
  }
}

const createPurePhoneAdapter = (pureNode: any): PurePhoneAdapter =>
  new PurePhone(pureNode)

export default createPurePhoneAdapter
