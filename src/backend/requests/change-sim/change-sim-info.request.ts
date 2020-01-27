import Adapters from "Backend/adapters/adapters.interface"
import createEndpoint from "Backend/endpoints/create-endpoint"
import ChangeSimInfo from "Common/interfaces/change-sim-info.interface"
import { IpcRequest } from "Common/requests/ipc-request.enum"

const handleChangeSimRequestInfo = ({
  pureNetwork,
}: Adapters): ChangeSimInfo => {
  return {
    number: pureNetwork.changeSimCard(),
  }
}

const registerChangeSimCardInfoRequest = createEndpoint({
  name: IpcRequest.GetChangeSimInfo,
  handler: handleChangeSimRequestInfo,
})

export default registerChangeSimCardInfoRequest
