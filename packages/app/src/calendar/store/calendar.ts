/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { Calendar, CalendarEvent, CalendarState } from "App/calendar/store/calendar.interfaces"
import {
  getSortedEvents,
  mapEvents,
} from "App/calendar/store/calendar.helpers"
import { Slicer } from "@rematch/select"
import { RootState } from "Renderer/store"
import externalProvidersStore from "Renderer/store/external-providers"
import { Provider } from "Renderer/models/external-providers/external-providers.interface"
import { eventsData } from "App/seeds/calendar"
import { createModel } from "@rematch/core"
import { RootModel } from "Renderer/models/models"
import overwriteDuplicates from "App/calendar/helpers/overwrite-duplicates/overwrite-duplicates"
import { ResultsState } from "App/contacts/store/contacts.enum"
import logger from "App/main/utils/logger"
import getEvents from "Renderer/requests/get-events.request"

export const initialState: CalendarState = {
  calendars: [],
  events: [],
  resultState: ResultsState.Empty,
}

const calendar = createModel<RootModel>({
  state: initialState,
  reducers: {
    setResultState(state: CalendarState, resultState: ResultsState) {
      return { ...state, resultState }
    },
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
        events: overwriteDuplicates({ oldEvents: state.events, newEvents }),
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
      return slice((state: CalendarState) => {
        const events = mapEvents(state.events)
        return getSortedEvents(events)
      })
    },
  }),
  effects: (d) => {
    const dispatch = (d as unknown) as RootState
    let loading = false

    return {
      async loadData() {
        // FIXME: due to the async nature of the store, this won't work. How to deal with that?
        // if (rootState.calendar.resultsState === ResultsState.Loading) {
        if (loading) {
          return
        }
        loading = true
        dispatch.calendar.setResultState(ResultsState.Loading)
        const { error, data = [] } = await getEvents()
        if (error) {
          logger.error(error)
          dispatch.calendar.setResultState(ResultsState.Error)
        } else {
          dispatch.calendar.setEvents(data)
          dispatch.calendar.setResultState(ResultsState.Loaded)
        }
        loading = false
      },

      async loadCalendars(provider: Provider) {
        let calendars: Calendar[] = []

        dispatch.calendar.clearCalendars()

        switch (provider) {
          case Provider.Apple:
            break
          case Provider.Microsoft:
            break
          case Provider.Google:
            calendars = ((await externalProvidersStore.dispatch.google.getCalendars()) as unknown) as Calendar[]
        }
        dispatch.calendar.setCalendars(calendars)
      },
      async loadEvents(calendar: Calendar) {
        let events: CalendarEvent[] = []
        switch (calendar.provider) {
          case Provider.Google:
            events = ((await externalProvidersStore.dispatch.google.getEvents(
              calendar.id
            )) as unknown) as CalendarEvent[]
        }
        dispatch.calendar.setEvents(events)
        return events
      },
    }
  },
})

export default calendar
