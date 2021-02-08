import Adapters from "Backend/adapters/adapters.interface"
import createEndpoint from "Backend/endpoints/create-endpoint"
import { IpcRequest } from "Common/requests/ipc-request.enum"
import DeviceResponse from "Backend/adapters/device-response.interface"

const handleDisconnectDevice = ({ purePhone }: Adapters): DeviceResponse => {
  return purePhone.disconnectDevice()
}

const registerDisconnectDeviceRequest = createEndpoint({
  name: IpcRequest.DisconnectDevice,
  handler: handleDisconnectDevice,
})

export default registerDisconnectDeviceRequest
