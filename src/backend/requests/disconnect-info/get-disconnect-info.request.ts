import Adapters from "Backend/adapters/adapters.interface"
import createEndpoint from "Backend/endpoints/create-endpoint"
import DisconnectInfo from "Common/interfaces/disconnect-info"
import { IpcRequest } from "Common/requests/ipc-request.enum"

const handleDisconnectInfoRequest = ({
  pureDisconnectService,
}: Adapters): DisconnectInfo => {
  return {
    disconnected: pureDisconnectService.getDisconnectStatus(),
  }
}

const registerDisconnectInfoRequest = createEndpoint({
  name: IpcRequest.GetDisconnectInfo,
  handler: handleDisconnectInfoRequest,
})

export default registerDisconnectInfoRequest
