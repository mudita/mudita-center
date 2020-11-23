import { Calendar, CalendarEvent, StateProps } from "./calendar.interfaces"
import { getSortedEvents } from "Renderer/models/calendar/calendar.helpers"
import { Slicer } from "@rematch/select"
import { Dispatch } from "Renderer/store"
import externalProvidersStore from "Renderer/store/external-providers"
import { Provider } from "Renderer/models/external-providers/external-providers.interface"

export const initialState: StateProps = {
  calendars: [],
  events: [],
}

export default {
  state: initialState,
  reducers: {
    setCalendars(state: StateProps, newCalendars: Calendar[]) {
      return {
        ...state,
        calendars: [...state.calendars, ...newCalendars],
      }
    },
    clearCalendars(state: StateProps) {
      return {
        ...state,
        calendars: [],
      }
    },
    clearEvents(state: StateProps) {
      return {
        ...state,
        events: [],
      }
    },
    setEvents(state: StateProps, newEvents: CalendarEvent[]) {
      return {
        ...state,
        events: [...state.events, ...newEvents],
      }
    },
  },
  selectors: (slice: Slicer<StateProps>) => ({
    sortedEvents() {
      return slice((state: StateProps) => getSortedEvents(state.events))
    },
  }),
  effects: (dispatch: Dispatch) => ({
    async loadCalendars(provider: Provider) {
      let calendars: Calendar[] = []

      dispatch.calendar.clearCalendars()

      switch (provider) {
        case Provider.Google:
          calendars = await externalProvidersStore.dispatch.google.getCalendars()
      }
      dispatch.calendar.setCalendars(calendars)
    },
    async loadEvents(calendar: Calendar) {
      let events: CalendarEvent[] = []
      switch (calendar.provider) {
        case Provider.Google:
          events = await externalProvidersStore.dispatch.google.getEvents(
            calendar.id
          )
      }
      dispatch.calendar.setEvents(events)
      return events
    },
  }),
}
