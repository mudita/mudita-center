import Adapters from "Backend/adapters/adapters.interface"
import DeviceResponse from "Backend/adapters/device-response.interface"
import createEndpoint from "Backend/endpoints/create-endpoint"
import { IpcRequest } from "Common/requests/ipc-request.enum"
import { Calendar } from "Renderer/models/calendar/calendar.interfaces"

const handleGetEventsRequest = ({
  calendar,
}: Adapters): Promise<DeviceResponse<Calendar[]>> => {
  return calendar.getEvents()
}

const registerGetEventsRequest = createEndpoint({
  name: IpcRequest.GetEvents,
  handler: handleGetEventsRequest,
})

export default registerGetEventsRequest
