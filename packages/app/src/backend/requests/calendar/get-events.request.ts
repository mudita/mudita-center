/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/LICENSE.md
 */

import Adapters from "Backend/adapters/adapters.interface"
import DeviceResponse from "Backend/adapters/device-response.interface"
import createEndpoint from "Backend/endpoints/create-endpoint"
import { IpcRequest } from "Common/requests/ipc-request.enum"
import { CalendarEvent } from "Renderer/models/calendar/calendar.interfaces"

const handleGetEventsRequest = ({
  calendar,
}: Adapters): Promise<DeviceResponse<CalendarEvent[]>> => calendar.getEvents()

const registerGetEventsRequest = createEndpoint({
  name: IpcRequest.GetEvents,
  handler: handleGetEventsRequest,
})

export default registerGetEventsRequest
