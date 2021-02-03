import Adapters from "Backend/adapters/adapters.interface"
import createEndpoint from "Backend/endpoints/create-endpoint"
import { IpcRequest } from "Common/requests/ipc-request.enum"
import DeviceResponse from "Backend/adapters/device-response.interface"

const handleUpdateOs = (
  { purePhone }: Adapters,
  {
    updateFilePath,
    progressChannel,
  }: { updateFilePath: string; progressChannel: string }
): Promise<DeviceResponse> | DeviceResponse => {
  return purePhone.updateOs(updateFilePath, progressChannel)
}

const registerUpdateOsRequest = createEndpoint({
  name: IpcRequest.UpdateOs,
  handler: handleUpdateOs,
})

export default registerUpdateOsRequest
