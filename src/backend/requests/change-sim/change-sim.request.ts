import Adapters from "Backend/adapters/adapters.interface"
import createEndpoint from "Backend/endpoints/create-endpoint"
import ChangeSimInfo from "Common/interfaces/change-sim-info.interface"
import { IpcRequest } from "Common/requests/ipc-request.enum"

const handleChangeSimRequest = ({ pureNetwork }: Adapters): ChangeSimInfo => {
  return {
    number: pureNetwork.setActiveCard(),
  }
}

const registerChangeSimCardRequest = createEndpoint({
  name: IpcRequest.PostChangeSim,
  handler: handleChangeSimRequest,
})

export default registerChangeSimCardRequest
