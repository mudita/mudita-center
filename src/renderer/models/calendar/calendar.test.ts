import { init } from "@rematch/core"
import calendar from "Renderer/models/calendar/calendar"
import { mockedCalendars } from "App/__mocks__/calendars-list"
import { eventsData } from "App/seeds/calendar"
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
  expect(store.getState().calendar.calendars).toStrictEqual(mockedCalendars)
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
  store.dispatch.calendar.setEvents(eventsData)
  expect(store.getState().calendar.events).toHaveLength(eventsData.length)
})

test("events are sorted by startDate properly", () => {
  const unsortedEvents = [
    {
      id: "test-event-1",
      name: "Felix's Birthday",
      startDate: "2020-01-01T10:00:00.000Z",
      endDate: "2020-01-01T13:00:00.000Z",
    },
    {
      id: "test-event-3",
      name: "Felix's Birthday 3",
      startDate: "2222-02-03T10:00:00.000Z",
      endDate: "2222-02-03T13:00:00.000Z",
    },
    {
      id: "test-event-2",
      name: "Felix's Birthday 2",
      startDate: "2020-01-02T15:00:00.000Z",
      endDate: "2020-01-02T13:00:00.000Z",
    },
  ]

  const sortedEvents = getSortedEvents(unsortedEvents)

  expect(sortedEvents).toHaveLength(unsortedEvents.length)

  for (let i = 0; i < sortedEvents.length - 1; i++) {
    expect(new Date(sortedEvents[i].startDate).getTime()).toBeLessThanOrEqual(
      new Date(sortedEvents[i + 1].startDate).getTime()
    )
  }
})
