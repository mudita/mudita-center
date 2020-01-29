import Adapters from "Backend/adapters/adapters.interface"
import createEndpoint from "Backend/endpoints/create-endpoint"
import DisconnectStatus from "Common/interfaces/disconnect-status"
import { IpcRequest } from "Common/requests/ipc-request.enum"

const handleDisconnectDevice = ({ purePhone }: Adapters): DisconnectStatus => {
  return {
    disconnected: purePhone.getDisconnectStatus(),
  }
}

const registerDisconnectDeviceRequest = createEndpoint({
  name: IpcRequest.DisconnectDevice,
  handler: handleDisconnectDevice,
})

export default registerDisconnectDeviceRequest
