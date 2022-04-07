/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import Adapters from "Backend/adapters/adapters.interface"
import createEndpoint from "Backend/endpoints/create-endpoint"
import { IpcRequest } from "Common/requests/ipc-request.enum"
import { CalendarEvent } from "App/calendar/store/calendar.interfaces"
import { RequestResponse } from "App/core/types/request-response.interface"

const handleGetEventsRequest = ({
  calendar,
}: Adapters): Promise<RequestResponse<CalendarEvent[]>> => calendar.getEvents()

const registerGetEventsRequest = createEndpoint({
  name: IpcRequest.GetEvents,
  handler: handleGetEventsRequest,
})

export default registerGetEventsRequest
