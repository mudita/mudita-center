import { CalendarEvent } from "Renderer/modules/calendar/calendar.interface"

export const calendarSeed: CalendarEvent[] = [
  {
    id: "test-event-1",
    name: "Felix's Birthday",
    date: [new Date("2020-01-01 11:00"), new Date("2020-01-01 14:00")],
  },
  {
    id: "test-event-2",
    name: "Felix's Birthday 2",
    date: [new Date("2020-01-02 11:00"), new Date("2020-01-02 14:00")],
  },
  {
    id: "test-event-3",
    name: "Felix's Birthday 3",
    date: [new Date("2020-02-01 11:00"), new Date("2020-02-02 14:00")],
  },
]
