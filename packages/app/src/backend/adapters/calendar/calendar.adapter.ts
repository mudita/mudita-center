/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/LICENSE.md
 */

import DeviceService from "Backend/device-service"
import DeviceResponse, {
  DeviceResponseStatus,
} from "Backend/adapters/device-response.interface"
import CalendarAdapter from "Backend/adapters/calendar/calendar-adapter.class"
import { Endpoint, Method } from "@mudita/pure"
import { CalendarEvent } from "Renderer/models/calendar/calendar.interfaces"

class CalendarA extends CalendarAdapter {
  constructor(private deviceService: DeviceService) {
    super()
  }

  public async getEvents(): Promise<DeviceResponse<CalendarEvent[]>> {
    const { status, data } = await this.deviceService.request({
      endpoint: Endpoint.Calendar,
      method: Method.Get,
      body: {},
    })

    if (status === DeviceResponseStatus.Ok) {
      return {
        status,
        data,
      }
    } else {
      return { status, error: { message: "Something went wrong" } }
    }
  }
}

const createCalendar = (deviceService: DeviceService): CalendarA =>
  new CalendarA(deviceService)

export default createCalendar
