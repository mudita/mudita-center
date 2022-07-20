/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { CalendarEvent } from "App/__deprecated__/calendar/store/calendar.interfaces"
import { RequestResponse } from "App/core/types/request-response.interface"

export default abstract class CalendarAdapter {
  public abstract getEvents(): Promise<RequestResponse<CalendarEvent[]>>
}
