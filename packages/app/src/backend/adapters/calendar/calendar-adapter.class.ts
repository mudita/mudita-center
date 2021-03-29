/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import DeviceResponse from "Backend/adapters/device-response.interface"
import { CalendarEvent } from "App/calendar/store/calendar.interfaces"

export default abstract class CalendarAdapter {
  public abstract getEvents(): Promise<DeviceResponse<CalendarEvent[]>>
}
