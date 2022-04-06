/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import CalendarAdapter from "Backend/adapters/calendar/calendar-adapter.class"
import { CalendarEvent } from "App/calendar/store/calendar.interfaces"
import { eventsData } from "App/seeds/calendar"
import {
  RequestResponse,
  RequestResponseStatus,
} from "App/core/types/request-response.interface"

class Calendar extends CalendarAdapter {
  constructor() {
    super()
  }

  public getEvents(): Promise<RequestResponse<CalendarEvent[]>> {
    return Promise.resolve({
      status: RequestResponseStatus.Ok,
      data: eventsData,
    })
  }
}

const createCalendarAdapter = (): Calendar => new Calendar()

export default createCalendarAdapter
