import Adapters from "Backend/adapters/adapters.interface"
import createEndpoint from "Backend/endpoints/create-endpoint"
import NetworkInfo from "Common/interfaces/network-info.interface"
import { IpcRequest } from "Common/requests/ipc-request.enum"

const handleNetworkRequestInfo = ({ pureNetwork }: Adapters): NetworkInfo => ({
  simCards: pureNetwork.getSimCards(),
})

const registerNetworkInfoRequest = createEndpoint({
  name: IpcRequest.GetNetworkInfo,
  handler: handleNetworkRequestInfo,
})

export default registerNetworkInfoRequest
