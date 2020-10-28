import { init } from "@rematch/core"
import calendar from "Renderer/models/calendar/calendar"
import { mockedCalendars } from "App/__mocks__/calendars-list"
import { calendarData } from "App/seeds/calendar"
import { getSortedEvents } from "Renderer/models/calendar/calendar.helpers"

const initStore = () =>
  init({
    models: { calendar },
  })

let store = initStore()

beforeEach(() => {
  store = initStore()
})

test("store returns initial state", () => {
  expect(store.getState()).toMatchInlineSnapshot(`
    Object {
      "calendar": Object {
        "calendars": Array [],
        "events": Array [],
      },
    }
  `)
})

test("calendars are set properly", () => {
  store.dispatch.calendar.setCalendars(mockedCalendars)
  expect(store.getState().calendar.calendars).toHaveLength(
    mockedCalendars.length
  )
})

test("calendars are cleared properly", () => {
  store.dispatch.calendar.setCalendars(mockedCalendars)
  expect(store.getState().calendar.calendars).toHaveLength(
    mockedCalendars.length
  )
  store.dispatch.calendar.clearCalendars()
  expect(store.getState().calendar.calendars).toHaveLength(0)
})

test("events are set properly", () => {
  store.dispatch.calendar.setEvents(calendarData)
  expect(store.getState().calendar.events).toHaveLength(calendarData.length)
})

test("events are sorted by date properly", () => {
  const events = [...calendarData].reverse().slice(0, 4)
  expect(getSortedEvents(events)).toMatchInlineSnapshot(`
    Array [
      Object {
        "endDate": "2020-01-10T13:00:00.000Z",
        "id": "test-event-10",
        "name": "Felix's Birthday 10",
        "startDate": "2020-01-10T10:00:00.000Z",
      },
      Object {
        "endDate": "2020-01-11T13:00:00.000Z",
        "id": "test-event-11",
        "name": "Felix's Birthday 11",
        "startDate": "2020-01-11T10:00:00.000Z",
      },
      Object {
        "endDate": "2020-02-09T13:00:00.000Z",
        "id": "test-event-9",
        "name": "Felix's Birthday 9",
        "startDate": "2020-02-09T10:00:00.000Z",
      },
      Object {
        "endDate": "2020-02-12T13:00:00.000Z",
        "id": "test-event-12",
        "name": "Felix's Birthday 12",
        "startDate": "2020-02-12T10:00:00.000Z",
      },
    ]
  `)
})
