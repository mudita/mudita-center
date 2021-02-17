import DeviceService from "Backend/device-service"
import DeviceResponse, {
  DeviceResponseStatus,
} from "Backend/adapters/device-response.interface"
import CalendarAdapter from "Backend/adapters/calendar/calendar-adapter.class"
import { Endpoint, Method } from "@mudita/pure"
import { Calendar } from "Renderer/models/calendar/calendar.interfaces"

class CalendarA extends CalendarAdapter {
  constructor(private deviceService: DeviceService) {
    super()
  }

  public async getEvents(): Promise<DeviceResponse<Calendar[]>> {
    const { status, data } = await this.getEvent()

    if (status === DeviceResponseStatus.Ok) {
      return {
        status,
        data,
      }
    } else {
      return { status, error: { message: "asfdsdfsd" } }
    }
  }

  private getEvent(): Promise<DeviceResponse> {
    return this.deviceService.request({
      endpoint: Endpoint.Calendar,
      method: Method.Get,
    })
  }
}

const createCalendar = (deviceService: DeviceService): CalendarA =>
  new CalendarA(deviceService)

export default createCalendar
