import ical, { CalendarComponent, DateWithTimeZone } from "node-ical"
import { CalendarEvent } from "Renderer/models/calendar/calendar.interfaces"

const parseEvent = (event: CalendarComponent): CalendarEvent => {
  let id = ""
  let name = ""
  let startDate = ""
  let endDate = ""

  if (event.uid) {
    id = event.uid.toString()
  }

  if (event.summary) {
    name = event.summary.toString()
  }

  if (event.start) {
    startDate = new Date(event.start as DateWithTimeZone).toISOString()
  }

  if (event.end) {
    endDate = new Date(event.end as DateWithTimeZone).toISOString()
  }

  return {
    id,
    name: name || (event.description as string) || "",
    startDate,
    endDate,
  }
}

const parseIcs = async (paths: string[]) => {
  const parsedEvents: CalendarEvent[] = []
  for (const path of paths) {
    const calendarEvents = await ical.async.parseFile(path)
    for (const event of Object.values(calendarEvents)) {
      parsedEvents.push(parseEvent(event))
    }
  }
  return parsedEvents.filter((event) => event.startDate && event.endDate)
}

export default parseIcs
