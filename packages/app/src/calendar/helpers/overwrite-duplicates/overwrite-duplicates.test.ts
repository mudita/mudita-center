import overwriteDuplicates, {
  createEventUID,
  findDuplicate,
  findDifferences,
  extendDescription,
} from "./overwrite-duplicates"
import { CalendarEvent } from "Renderer/models/calendar/calendar.interfaces"
import { Provider } from "Renderer/models/external-providers/external-providers.interface"

const events: CalendarEvent[] = [
  {
    id: "test-event-1-0",
    name: "Felix's Birthday",
    startDate: "2021-01-01T10:00:00.000Z",
    endDate: "2021-01-01T13:00:00.000Z",
    description: "This is an old description",
    provider: {
      type: Provider.Google,
      id: "test-event-1",
      calendarId: "example@mudita.com",
    },
  },
  {
    id: "test-event-3",
    name: "Felix's Birthday 3",
    startDate: "2022-02-03T10:00:00.000Z",
    endDate: "2022-02-03T13:00:00.000Z",
  },
]

test("unique event ID is created properly", () => {
  expect(createEventUID(events[0])).toBe(
    "google_example@mudita.com_test-event-1"
  )
  expect(createEventUID(events[1])).toBe("test-event-3")
})

test("events duplicates are found properly", () => {
  expect(findDuplicate(events, events[0])).toBe(events[0])
  expect(
    findDuplicate(events, {
      id: "test-event-4",
      name: "Felix's Birthday 4",
      startDate: "2022-02-03T10:00:00.000Z",
      endDate: "2022-02-03T13:00:00.000Z",
      provider: {
        type: Provider.Microsoft,
        id: "test-event-4",
        calendarId: "example@mudita.com",
      },
    })
  ).toBeUndefined()
})

test("differences between events are found properly", () => {
  const diff = findDifferences(
    {
      id: "test-event-3",
      name: "Felix's Birthday 3",
      startDate: "2022-02-03T10:00:00.000Z",
      endDate: "2022-02-03T13:00:00.000Z",
      recurrence: {
        origOptions: {
          dtstart: new Date("2016-08-25T11:00:00.000Z"),
          freq: 3,
          count: 10,
        },
      },
    },
    {
      id: "test-event-3",
      name: "Felix's Birthday 4",
      startDate: "2022-02-03T11:00:00.000Z",
      endDate: "2022-02-03T14:00:00.000Z",
      recurrence: {
        origOptions: {
          dtstart: new Date("2016-08-25T11:00:00.000Z"),
          freq: 3,
          count: 11,
        },
      },
    }
  )
  expect(diff)
    .toBe(`[value] view.name.calendar.duplicatedEvent.name: Felix's Birthday 3
[value] view.name.calendar.duplicatedEvent.startDate: 2022-02-03T10:00:00.000Z
[value] view.name.calendar.duplicatedEvent.endDate: 2022-02-03T13:00:00.000Z
[value] view.name.calendar.duplicatedEvent.recurrence: DTSTART:20160825T110000Z
RRULE:FREQ=DAILY;COUNT=10`)
})

test("new description is created properly", () => {
  const description = extendDescription(undefined, "new text")
  expect(description).toBe("new text")
})

test("existing description is updated properly", () => {
  const description = extendDescription(
    "Do something in NY.",
    "Do something in LA."
  )
  expect(description).toBe(
    "Do something in LA.\n" +
      "~~~~~~~~~~~~~~~~~~~~\n" +
      "[value] view.name.calendar.duplicatedEvent.updatedDescriptionTitle\n" +
      "~~~~~~~~~~~~~~~~~~~~\n" +
      "Do something in NY."
  )
})

test("exact duplicates are overwritten properly", () => {
  const newEvents = overwriteDuplicates(events, [
    {
      id: "test-event-1",
      name: "Felix's Birthday",
      startDate: "2021-01-01T10:00:00.000Z",
      endDate: "2021-01-01T13:00:00.000Z",
      description: "This is an old description",
      provider: {
        type: Provider.Google,
        id: "test-event-1",
        calendarId: "example@mudita.com",
      },
    },
  ])
  expect(newEvents).toStrictEqual([
    {
      id: "test-event-1",
      name: "Felix's Birthday",
      startDate: "2021-01-01T10:00:00.000Z",
      endDate: "2021-01-01T13:00:00.000Z",
      description: "This is an old description",
      provider: {
        type: Provider.Google,
        id: "test-event-1",
        calendarId: "example@mudita.com",
      },
    },
    {
      id: "test-event-3",
      name: "Felix's Birthday 3",
      startDate: "2022-02-03T10:00:00.000Z",
      endDate: "2022-02-03T13:00:00.000Z",
    },
  ])
})

test("duplicates with slightly modified data are overwritten properly", () => {
  const newEvents = overwriteDuplicates(
    [
      {
        id: "test-event-1-0",
        name: "Felix's Birthday",
        startDate: "2021-01-01T10:00:00.000Z",
        endDate: "2021-01-01T13:00:00.000Z",
        description: "This is an old description",
        provider: {
          type: Provider.Google,
          id: "test-event-1",
          calendarId: "example@mudita.com",
        },
      },
      {
        id: "test-event-3",
        name: "Felix's Birthday 3",
        startDate: "2022-02-03T10:00:00.000Z",
        endDate: "2022-02-03T13:00:00.000Z",
      },
    ],
    [
      {
        id: "test-event-1-1",
        name: "Felix's Birthday 2",
        startDate: "2022-01-01T10:00:00.000Z",
        endDate: "2022-01-01T13:00:00.000Z",
        description: "This is a new description",
        provider: {
          type: Provider.Google,
          id: "test-event-1",
          calendarId: "example@mudita.com",
        },
      },
    ]
  )
  expect(newEvents).toStrictEqual([
    {
      id: "test-event-1-1",
      name: "Felix's Birthday 2",
      startDate: "2022-01-01T10:00:00.000Z",
      endDate: "2022-01-01T13:00:00.000Z",
      description:
        "This is a new description\n~~~~~~~~~~~~~~~~~~~~\n[value] view.name.calendar.duplicatedEvent.updatedDescriptionTitle\n~~~~~~~~~~~~~~~~~~~~\n[value] view.name.calendar.duplicatedEvent.name: Felix's Birthday\n[value] view.name.calendar.duplicatedEvent.startDate: 2021-01-01T10:00:00.000Z\n[value] view.name.calendar.duplicatedEvent.endDate: 2021-01-01T13:00:00.000Z\n[value] view.name.calendar.duplicatedEvent.description: This is an old description",
      provider: {
        calendarId: "example@mudita.com",
        id: "test-event-1",
        type: "google",
      },
    },
    {
      id: "test-event-3",
      name: "Felix's Birthday 3",
      startDate: "2022-02-03T10:00:00.000Z",
      endDate: "2022-02-03T13:00:00.000Z",
    },
  ])
})
