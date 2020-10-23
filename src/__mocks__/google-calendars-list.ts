import { Calendar } from "Renderer/models/calendar/calendar.interfaces"
import { Provider } from "Renderer/models/external-providers/external-providers.interface"

export const mockedGoogleCalendars: Calendar[] = [
  {
    id: "jane.doe@example.com",
    name: "jane.doe@example.com",
    provider: Provider.Google,
  },
  {
    id: "john.doe@example.com",
    name: "john.doe@example.com",
    provider: Provider.Google,
    primary: true,
  },
  {
    id: "example.com_jub4tl9r12ain8850vgdfksu6k@group.calendar.google.com",
    name: "John Doe - other calendar",
    provider: Provider.Google,
  },
  {
    id: "appnroll.com_3133393133313330343936@resource.calendar.google.com",
    name: "Somebody's calendar",
    provider: Provider.Google,
  },
  {
    id: "pl.polish#holiday@group.v.calendar.google.com",
    name: "Holidays in Poland",
    provider: Provider.Google,
  },
]
