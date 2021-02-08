import Adapters from "Backend/adapters/adapters.interface"
import createEndpoint from "Backend/endpoints/create-endpoint"
import { IpcRequest } from "Common/requests/ipc-request.enum"
import DeviceResponse from "Backend/adapters/device-response.interface"

const handleChangeSimRequest = ({ pureNetwork }: Adapters): DeviceResponse => {
  return pureNetwork.setActiveCard()
}

const registerChangeSimCardRequest = createEndpoint({
  name: IpcRequest.ChangeSim,
  handler: handleChangeSimRequest,
})

export default registerChangeSimCardRequest
