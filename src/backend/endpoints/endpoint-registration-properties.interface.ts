import Adapters from "Backend/adapters/adapters.interface"
import { IpcRequest } from "Common/requests/ipc-request.enum"

export default interface EndpointRegistrationProperties<Params, Response> {
  name: IpcRequest
  handler: (
    adapters: Adapters,
    data: Params
  ) => Response | PromiseLike<Response>
}
