import { GoogleCalendar } from "Renderer/models/external-providers/google/google.interface"

export const mockedGoogleCalendars: GoogleCalendar[] = [
  {
    id: "calendar-123",
    summary: "My calendar",
    primary: true,
  },
  {
    id: "calendar-456",
    summary: "Work calendar",
  },
  {
    id: "calendar-789",
    summary: "John's calendar",
  },
]
