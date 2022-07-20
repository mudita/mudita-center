/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import Adapters from "App/__deprecated__/backend/adapters/adapters.interface"
import createEndpoint from "App/__deprecated__/backend/endpoints/create-endpoint"
import { IpcRequest } from "App/__deprecated__/common/requests/ipc-request.enum"
import { CalendarEvent } from "App/__deprecated__/calendar/store/calendar.interfaces"
import { RequestResponse } from "App/core/types/request-response.interface"

const handleGetEventsRequest = ({
  calendar,
}: Adapters): Promise<RequestResponse<CalendarEvent[]>> => calendar.getEvents()

const registerGetEventsRequest = createEndpoint({
  name: IpcRequest.GetEvents,
  handler: handleGetEventsRequest,
})

export default registerGetEventsRequest
