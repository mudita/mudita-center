import { Calendar, CalendarEvent, CalendarState } from "./calendar.interfaces"
import { getSortedEvents } from "Renderer/models/calendar/calendar.helpers"
import { Slicer } from "@rematch/select"
import { Dispatch } from "Renderer/store"
import externalProvidersStore from "Renderer/store/external-providers"
import { Provider } from "Renderer/models/external-providers/external-providers.interface"
import { eventsData } from "App/seeds/calendar"

export const initialState: CalendarState = {
  calendars: [],
  events: [],
}

export default {
  state: initialState,
  reducers: {
    setCalendars(state: CalendarState, newCalendars: Calendar[]) {
      return {
        ...state,
        calendars: [...state.calendars, ...newCalendars],
      }
    },
    clearCalendars(state: CalendarState) {
      return {
        ...state,
        calendars: [],
      }
    },
    setEvents(state: CalendarState, newEvents: CalendarEvent[]) {
      return {
        ...state,
        events: [...state.events, ...newEvents],
      }
    },
    _devClearAllEvents(state: CalendarState) {
      return {
        ...state,
        events: [],
      }
    },
    _devLoadDefaultEvents(state: CalendarState) {
      return {
        ...state,
        events: eventsData,
      }
    },
  },
  selectors: (slice: Slicer<CalendarState>) => ({
    sortedEvents() {
      return slice((state: CalendarState) => getSortedEvents(state.events))
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
