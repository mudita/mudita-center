import { init } from "@rematch/core"
import calendar from "Renderer/models/calendar/calendar"
import { mockedCalendars } from "App/__mocks__/calendars-list"
import { Provider } from "Renderer/models/external-providers/external-providers.interface"
import { calendarData } from "App/seeds/calendar"
import {
  getSortedEvents,
  mapGoogleCalendars,
  mapGoogleEvents,
} from "Renderer/models/calendar/calendar.helpers"
import { mockedGoogleEvents } from "App/__mocks__/google-events-list"
import { mockedGoogleCalendars } from "App/__mocks__/google-calendars-list"

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

test("calendars duplicates are omitted properly", () => {
  store.dispatch.calendar.setCalendars(mockedCalendars)
  store.dispatch.calendar.setCalendars([
    ...mockedCalendars,
    {
      id: "jane.doe@example.com",
      name: "jane.doe@example.com",
      provider: Provider.Apple,
    },
  ])
  expect(store.getState().calendar.calendars).toHaveLength(
    mockedCalendars.length + 1
  )
})

test("events are set properly", () => {
  store.dispatch.calendar.setEvents(calendarData)
  expect(store.getState().calendar.events).toHaveLength(calendarData.length)
})

test("events are sorted by date properly", () => {
  const events = calendarData.reverse().slice(0, 4)
  expect(getSortedEvents(events)).toMatchInlineSnapshot(`
    Array [
      Object {
        "date": Array [
          2020-01-10T10:00:00.000Z,
          2020-01-10T13:00:00.000Z,
        ],
        "id": "test-event-10",
        "name": "Felix's Birthday 10",
      },
      Object {
        "date": Array [
          2020-01-11T10:00:00.000Z,
          2020-01-11T13:00:00.000Z,
        ],
        "id": "test-event-11",
        "name": "Felix's Birthday 11",
      },
      Object {
        "date": Array [
          2020-02-09T10:00:00.000Z,
          2020-02-09T13:00:00.000Z,
        ],
        "id": "test-event-9",
        "name": "Felix's Birthday 9",
      },
      Object {
        "date": Array [
          2020-02-12T10:00:00.000Z,
          2020-02-12T13:00:00.000Z,
        ],
        "id": "test-event-12",
        "name": "Felix's Birthday 12",
      },
    ]
  `)
})

test("google events are mapped properly", () => {
  expect(mapGoogleEvents(mockedGoogleEvents)).toMatchInlineSnapshot(`
    Array [
      Object {
        "date": Array [
          2020-01-01T10:00:00.000Z,
          2020-01-01T13:00:00.000Z,
        ],
        "description": "Felix's Birthday",
        "id": "google_google-event-1",
        "name": "Felix's Birthday",
        "provider": Object {
          "id": "google-event-1",
          "type": "google",
        },
      },
      Object {
        "date": Array [
          2020-02-01T10:00:00.000Z,
          2020-02-01T13:00:00.000Z,
        ],
        "description": "Kate's Birthday",
        "id": "google_google-event-2",
        "name": "Kate's Birthday",
        "provider": Object {
          "id": "google-event-2",
          "type": "google",
        },
      },
      Object {
        "date": Array [
          2020-03-05T09:00:00.000Z,
          2020-03-05T11:00:00.000Z,
        ],
        "description": "Matthew's Birthday",
        "id": "google_google-event-3",
        "name": "Matthew's Birthday",
        "provider": Object {
          "id": "google-event-3",
          "type": "google",
        },
      },
      Object {
        "date": Array [
          2020-08-08T07:00:00.000Z,
          2020-08-08T08:00:00.000Z,
        ],
        "description": "John's Birthday",
        "id": "google_google-event-4",
        "name": "John's Birthday",
        "provider": Object {
          "id": "google-event-4",
          "type": "google",
        },
      },
    ]
  `)
})

test("google events are mapped properly", () => {
  expect(mapGoogleCalendars(mockedGoogleCalendars)).toMatchInlineSnapshot(`
    Array [
      Object {
        "id": "calendar-123",
        "name": "My calendar",
        "primary": true,
        "provider": "google",
      },
      Object {
        "id": "calendar-456",
        "name": "Work calendar",
        "primary": undefined,
        "provider": "google",
      },
      Object {
        "id": "calendar-789",
        "name": "John's calendar",
        "primary": undefined,
        "provider": "google",
      },
    ]
  `)
})
