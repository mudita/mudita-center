import { Provider } from "Renderer/models/external-providers/external-providers.interface"

export interface CalendarEvent {
  id: string
  name: string
  startDate: string
  endDate: string
  description?: string
  provider?: {
    type: Provider
    id: string
  }
}

export interface Calendar {
  id: string
  name: string
  provider: Provider
  primary?: boolean
}

export interface StateProps {
  calendars: Calendar[]
  events: CalendarEvent[]
}
