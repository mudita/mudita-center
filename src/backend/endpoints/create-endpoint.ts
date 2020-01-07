import Adapters from "Backend/adapters/adapters.interface"
import EndpointRegistrationProperties from "Backend/endpoints/endpoint-registration-properties.interface"
import { ipcMain } from "electron-better-ipc"

/**
 * Makes the main process aware of the potential incoming requests for data.
 * Creates a registration function that later expects to be provided with all
 * required adapters.
 *
 * @example
 * const registerCandyEndpoint = createEndpoint({
 *   name: IpcRequest.GetCandy,
 *   handler: ({phone}, taste: string) => phone.createCandyWithTaste(taste)
 * })
 *
 * registerCandyEndpoint({phone: createPhoneAdapter()})
 *
 * @info
 * Type casting of the callback is required due to how electron-better-ipc is typed.
 *
 * @param name Ipc Request name.
 * @param handler Handler dealing with the logic of constructing data.
 */
const createEndpoint = <Params, Response>({
  name,
  handler,
}: EndpointRegistrationProperties<Params, Response>) => (
  adapters: Adapters
) => {
  ipcMain.answerRenderer<Response>(
    name,
    handler.bind(null, adapters) as (data: unknown) => any
  )
}

export default createEndpoint
