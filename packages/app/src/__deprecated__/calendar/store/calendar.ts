/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import {
  Calendar,
  CalendarEvent,
  CalendarState,
} from "App/__deprecated__/calendar/store/calendar.interfaces"
import { getSortedEvents, mapEvents } from "App/__deprecated__/calendar/store/calendar.helpers"
import { Slicer } from "@rematch/select"
import { RootState } from "App/__deprecated__/renderer/store"
import externalProvidersStore from "App/__deprecated__/renderer/store/external-providers"
import { Provider } from "App/__deprecated__/renderer/models/external-providers/external-providers.interface"
import { eventsData } from "App/__deprecated__/seeds/calendar"
import { createModel } from "@rematch/core"
import { RootModel } from "App/__deprecated__/renderer/models/models"
import overwriteDuplicates from "App/__deprecated__/calendar/helpers/overwrite-duplicates/overwrite-duplicates"
import { ResultState } from "App/contacts/reducers/contacts.interface"
import logger from "App/__deprecated__/main/utils/logger"
import getEvents from "App/__deprecated__/renderer/requests/get-events.request"
import { OutLookScope } from "App/__deprecated__/renderer/models/external-providers/outlook/outlook.interface"

export const initialState: CalendarState = {
  calendars: [],
  events: [],
  resultState: ResultState.Empty,
}

const calendar = createModel<RootModel>({
  state: initialState,
  reducers: {
    setResultState(state: CalendarState, resultState: ResultState) {
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
    const dispatch = d as unknown as RootState
    let loading = false

    return {
      async loadData() {
        // FIXME: due to the async nature of the store, this won't work. How to deal with that?
        // if (rootState.calendar.resultsState === ResultsState.Loading) {
        if (loading) {
          return
        }
        loading = true
        dispatch.calendar.setResultState(ResultState.Loading)
        const { error, data = [] } = await getEvents()
        if (error) {
          logger.error(
            `Calendar: loads data fails. Data: ${JSON.stringify(error)}`
          )
          dispatch.calendar.setResultState(ResultState.Error)
        } else {
          dispatch.calendar.setEvents(data)
          dispatch.calendar.setResultState(ResultState.Loaded)
        }
        loading = false
      },

      async loadCalendars(provider: Provider) {
        let calendars: Calendar[] = []

        dispatch.calendar.clearCalendars()

        switch (provider) {
          case Provider.Apple:
            break
          case Provider.Outlook:
            await externalProvidersStore.dispatch.outlook.authorize(
              OutLookScope.Calendars
            )
            calendars =
              (await externalProvidersStore.dispatch.outlook.getCalendars()) as unknown as Calendar[]
            break
          case Provider.Google:
            calendars =
              (await externalProvidersStore.dispatch.google.getCalendars()) as unknown as Calendar[]
        }
        dispatch.calendar.setCalendars(calendars)
      },
      async loadEvents(calendar: Calendar) {
        let events: CalendarEvent[] = []
        switch (calendar.provider) {
          case Provider.Google:
            events = (await externalProvidersStore.dispatch.google.getEvents(
              calendar.id
            )) as unknown as CalendarEvent[]
            break
          case Provider.Outlook:
            events = (await externalProvidersStore.dispatch.outlook.getEvents(
              calendar.id
            )) as unknown as CalendarEvent[]
            break
        }
        dispatch.calendar.setEvents(events)
        return events
      },
    }
  },
})

export default calendar
