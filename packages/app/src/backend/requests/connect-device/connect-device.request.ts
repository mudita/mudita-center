import Adapters from "Backend/adapters/adapters.interface"
import createEndpoint from "Backend/endpoints/create-endpoint"
import { IpcRequest } from "Common/requests/ipc-request.enum"
import DeviceResponse from "Backend/adapters/device-response.interface"

const handleConnectDevice = ({
  purePhone,
}: Adapters): Promise<DeviceResponse> => {
  return purePhone.connectDevice()
}

const registerConnectDeviceRequest = createEndpoint({
  name: IpcRequest.ConnectDevice,
  handler: handleConnectDevice,
})

export default registerConnectDeviceRequest
