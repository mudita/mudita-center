import Adapters from "Backend/adapters/adapters.interface"
import createEndpoint from "Backend/endpoints/create-endpoint"
import BatteryInfo from "Common/interfaces/battery-info.interface"
import { IpcRequest } from "Common/requests/ipc-request.enum"
import DeviceResponse, {
  DeviceResponseStatus,
} from "Backend/adapters/device-response.interface"

const handleBatteryInfoRequest = async ({
  pureBatteryService,
}: Adapters): Promise<DeviceResponse<BatteryInfo>> => {
  const getBatteryLevelResponse = await pureBatteryService.getBatteryLevel()

  if (
    getBatteryLevelResponse.status === DeviceResponseStatus.Ok &&
    getBatteryLevelResponse.data !== undefined
  ) {
    return {
      status: DeviceResponseStatus.Ok,
      data: {
        charging: pureBatteryService.getChargingStatus(),
        level: getBatteryLevelResponse.data,
        maximumCapacity: pureBatteryService.getMaximumCapacity(),
      },
    }
  } else {
    return {
      status: DeviceResponseStatus.Error,
    }
  }
}

const registerBatteryInfoRequest = createEndpoint({
  name: IpcRequest.GetBatteryInfo,
  handler: handleBatteryInfoRequest,
})

export default registerBatteryInfoRequest
