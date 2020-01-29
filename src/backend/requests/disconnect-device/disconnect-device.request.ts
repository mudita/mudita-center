import Adapters from "Backend/adapters/adapters.interface"
import createEndpoint from "Backend/endpoints/create-endpoint"
import DisconnectInfo from "Common/interfaces/disconnect-info"
import { IpcRequest } from "Common/requests/ipc-request.enum"

const handleDisconnectDevice = ({ purePhone }: Adapters): DisconnectInfo => {
  return {
    disconnected: purePhone.disconnectDevice(),
  }
}

const registerDisconnectDeviceRequest = createEndpoint({
  name: IpcRequest.PostDisconnectDevice,
  handler: handleDisconnectDevice,
})

export default registerDisconnectDeviceRequest
