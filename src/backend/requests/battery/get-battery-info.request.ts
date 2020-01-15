import Adapters from "Backend/adapters/adapters.interface"
import createEndpoint from "Backend/endpoints/create-endpoint"
import BatteryInfo from "Common/interfaces/battery-info.interface"
import { IpcRequest } from "Common/requests/ipc-request.enum"

const handleBatteryInfoRequest = ({
  pureBatteryService,
}: Adapters): BatteryInfo => {
  return {
    charging: pureBatteryService.getChargingStatus(),
    level: pureBatteryService.getBatteryLevel(),
    maximumCapacity: pureBatteryService.getMaximumCapacity(),
  }
}

const registerBatteryInfoRequest = createEndpoint({
  name: IpcRequest.GetBatteryInfo,
  handler: handleBatteryInfoRequest,
})

export default registerBatteryInfoRequest
