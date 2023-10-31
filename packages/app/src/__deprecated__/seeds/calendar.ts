/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import {
  CalendarEvent,
  CalendarState,
} from "App/__deprecated__/calendar/store/calendar.interfaces"
import { ResultState } from "App/contacts/reducers/contacts.interface"

export const eventsData: CalendarEvent[] = [
  {
    id: "test-event-1",
    name: "Felix's Birthday",
    startDate: "2020-01-01T10:00:00.000Z",
    endDate: "2020-01-01T13:00:00.000Z",
  },
  {
    id: "test-event-2",
    name: "Felix's Birthday 2",
    startDate: "2020-01-02T10:00:00.000Z",
    endDate: "2020-01-02T13:00:00.000Z",
  },
  {
    id: "test-event-3",
    name: "Felix's Birthday 3",
    startDate: "2020-02-03T10:00:00.000Z",
    endDate: "2020-02-03T13:00:00.000Z",
  },
  {
    id: "test-event-4",
    name: "Felix's Birthday 4",
    startDate: "2020-01-04T10:00:00.000Z",
    endDate: "2020-01-04T13:00:00.000Z",
  },
  {
    id: "test-event-5",
    name: "Felix's Birthday 5",
    startDate: "2020-01-05T10:00:00.000Z",
    endDate: "2020-01-05T13:00:00.000Z",
  },
  {
    id: "test-event-6",
    name: "Felix's Birthday 6",
    startDate: "2020-02-06T10:00:00.000Z",
    endDate: "2020-02-06T13:00:00.000Z",
  },
  {
    id: "test-event-7",
    name: "Felix's Birthday 7",
    startDate: "2020-01-07T10:00:00.000Z",
    endDate: "2020-01-07T13:00:00.000Z",
  },
  {
    id: "test-event-8",
    name: "Felix's Birthday 8",
    startDate: "2020-01-08T10:00:00.000Z",
    endDate: "2020-01-08T13:00:00.000Z",
  },
  {
    id: "test-event-9",
    name: "Felix's Birthday 9",
    startDate: "2020-02-09T10:00:00.000Z",
    endDate: "2020-02-09T13:00:00.000Z",
  },
  {
    id: "test-event-10",
    name: "Felix's Birthday 10",
    startDate: "2020-01-10T10:00:00.000Z",
    endDate: "2020-01-10T13:00:00.000Z",
  },
  {
    id: "test-event-11",
    name: "Felix's Birthday 11",
    startDate: "2020-01-11T00:00:00.000Z",
    endDate: "2020-01-11T23:59:59.999Z",
  },
  {
    id: "test-event-12",
    name: "Felix's Birthday 12 multi",
    startDate: "2020-02-12T10:00:00.000Z",
    endDate: "2020-02-13T20:00:00.000Z",
  },
]

export const calendarSeed: CalendarState = {
  events: eventsData,
  calendars: [],
  resultState: ResultState.Loaded,
}
