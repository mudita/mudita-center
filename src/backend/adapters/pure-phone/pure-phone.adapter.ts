import PurePhoneAdapter from "Backend/adapters/pure-phone/pure-phone-adapter.class"
import DeviceResponse, {
  DeviceResponseStatus,
} from "Backend/adapters/device-response.interface"
import DeviceService from "Backend/device-service"
import { Endpoint, Method } from "pure"

class PurePhone extends PurePhoneAdapter {
  constructor(private deviceService: DeviceService) {
    super()
  }

  public getModelName(): string {
    return "Ziemniaczek Puree"
  }

  public getModelNumber(): string {
    return "Y0105W4GG1N5"
  }

  public getName(): string {
    return "Mudita Pure"
  }

  //TODO: handle it after add missed fields in API -> https://appnroll.atlassian.net/browse/PDA-590
  public getOsUpdateDate(): string {
    return "2020-01-14T11:31:08.244Z"
  }

  public async getOsVersion(): Promise<DeviceResponse<string>> {
    const { status, data } = await this.deviceService.request({
      endpoint: Endpoint.DeviceInfo,
      method: Method.Get,
    })

    if (status === DeviceResponseStatus.Ok && data) {
      return {
        status,
        data: data.gitTag,
      }
    } else {
      return { status, error: { message: "Something went wrong" } }
    }
  }

  public getSerialNumber(): string {
    return "1UB13213MN14K1"
  }

  public disconnectDevice(): DeviceResponse {
    return {
      status: DeviceResponseStatus.Ok,
    }
  }

  public connectDevice(): Promise<DeviceResponse> {
    return this.deviceService.connect()
  }

  public async updateOs(file: string): Promise<DeviceResponse> {
    const fileResponse = await this.deviceService.request({
      endpoint: Endpoint.File,
      method: Method.Post,
      file,
    })

    if (fileResponse.status === DeviceResponseStatus.Ok) {
      const PureUpdateResponse = await this.deviceService.request({
        endpoint: Endpoint.PureUpdate,
        method: Method.Post,
        file,
      })

      if (PureUpdateResponse.status === DeviceResponseStatus.Ok) {
        return {
          status: DeviceResponseStatus.Ok,
        }
      } else {
        return {
          status: DeviceResponseStatus.Error,
        }
      }
    } else {
      return {
        status: DeviceResponseStatus.Error,
      }
    }
  }
}

const createPurePhoneAdapter = (
  deviceService: DeviceService
): PurePhoneAdapter => new PurePhone(deviceService)

export default createPurePhoneAdapter
