/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/LICENSE.md
 */

import DeviceResponse, {
  DeviceResponseStatus,
} from "Backend/adapters/device-response.interface"
import CalendarAdapter from "Backend/adapters/calendar/calendar-adapter.class"
import { CalendarEvent } from "Renderer/models/calendar/calendar.interfaces"

class Calendar extends CalendarAdapter {
  constructor() {
    super()
  }

  public getEvents(): Promise<DeviceResponse<CalendarEvent[]>> {
    return Promise.resolve({
      status: DeviceResponseStatus.Ok,
      data: [],
    })
  }
}

const createCalendar = (): Calendar => new Calendar()

export default createCalendar
