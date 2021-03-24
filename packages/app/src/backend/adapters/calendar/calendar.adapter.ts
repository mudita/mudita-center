/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import DeviceResponse, {
  DeviceResponseStatus,
} from "Backend/adapters/device-response.interface"
import CalendarAdapter from "Backend/adapters/calendar/calendar-adapter.class"
import { CalendarEvent } from "App/calendar/store/calendar.interfaces"
import { eventsData } from "App/seeds/calendar"

class Calendar extends CalendarAdapter {
  constructor() {
    super()
  }

  public getEvents(): Promise<DeviceResponse<CalendarEvent[]>> {
    return Promise.resolve({
      status: DeviceResponseStatus.Ok,
      data: eventsData,
    })
  }
}

const createCalendarAdapter = (): Calendar => new Calendar()

export default createCalendarAdapter
