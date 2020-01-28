import Adapters from "Backend/adapters/adapters.interface"
import createEndpoint from "Backend/endpoints/create-endpoint"
import DisconnectInfo from "Common/interfaces/disconnect-info"
import { IpcRequest } from "Common/requests/ipc-request.enum"

const handleDisconnectInfoRequest = ({
  purePhone,
}: Adapters): DisconnectInfo => {
  return {
    disconnected: purePhone.getDisconnectStatus(),
  }
}

const registerDisconnectInfoRequest = createEndpoint({
  name: IpcRequest.GetDisconnectInfo,
  handler: handleDisconnectInfoRequest,
})

export default registerDisconnectInfoRequest
