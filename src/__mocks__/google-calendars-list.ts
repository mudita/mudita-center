import { GoogleCalendar } from "Renderer/models/external-providers/google/google.interface"

export const mockedGoogleCalendars: GoogleCalendar[] = [
  {
    id: "jane.doe@example.com",
    summary: "jane.doe@example.com",
    timeZone: "Europe/Warsaw",
    accessRole: "reader",
  },
  {
    id: "john.doe@example.com",
    summary: "john.doe@example.com",
    timeZone: "Europe/Warsaw",
    accessRole: "owner",
    primary: true,
  },
  {
    id: "example.com_jub4tl9r12ain8850vgdfksu6k@group.calendar.google.com",
    summary: "John Doe - other calendar",
    timeZone: "Europe/Warsaw",
    accessRole: "owner",
  },
  {
    id: "appnroll.com_3133393133313330343936@resource.calendar.google.com",
    summary: "Somebody's calendar",
    timeZone: "Europe/Warsaw",
    accessRole: "freeBusyReader",
  },
  {
    id: "pl.polish#holiday@group.v.calendar.google.com",
    summary: "Holidays in Poland",
    summaryOverride: "Holidays in Poland",
    timeZone: "Europe/Warsaw",
    accessRole: "reader",
  },
]
