import PurePhoneBatteryServiceAdapter from "Backend/adapters/pure-phone-battery-service/pure-phone-battery-service-adapter.class"
import DeviceService from "Backend/device-service"
import { Endpoint, Method } from "@mudita/pure"
import DeviceResponse, {
  DeviceResponseStatus,
} from "Backend/adapters/device-response.interface"

class PurePhoneBatteryService extends PurePhoneBatteryServiceAdapter {
  constructor(private deviceService: DeviceService) {
    super()
  }

  public async getBatteryLevel(): Promise<DeviceResponse<number>> {
    const { status, data } = await this.deviceService.request({
      endpoint: Endpoint.DeviceInfo,
      method: Method.Get,
    })

    if (status === DeviceResponseStatus.Ok && data) {
      return {
        status,
        data: Number((Number(data.batteryLevel) / 100).toFixed(2)),
      }
    } else {
      return { status, error: { message: "Something went wrong" } }
    }
  }

  // TODO: handle this mock in this task -> https://appnroll.atlassian.net/browse/PDA-589
  public getChargingStatus(): boolean {
    return true
  }
}

const createPurePhoneBatteryAdapter = (
  deviceService: DeviceService
): PurePhoneBatteryServiceAdapter => new PurePhoneBatteryService(deviceService)

export default createPurePhoneBatteryAdapter
