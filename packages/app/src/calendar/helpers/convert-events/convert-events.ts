import { CalendarEvent } from "Renderer/models/calendar/calendar.interfaces"
import ical from "ical-generator"
import { noop } from "Renderer/utils/noop"

export const convertEvents = (
  calendarEvents: CalendarEvent[],
  filePath: string
) => {
  const cal = ical()
  const calendar = cal.events([
    {
      start: new Date(),
      end: new Date(new Date().getTime() + 3600000),
      summary: "Example Event",
      description: "It works ;)",
      url: "http://sebbo.net/",
    },
  ])
  calendar.save(filePath, noop)
}
