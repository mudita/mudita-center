/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import overwriteDuplicates, {
  createEventUID,
  descriptionSeparator,
  findDifferences,
  findDuplicate,
  parseDescription,
} from "./overwrite-duplicates"
import { CalendarEvent } from "App/calendar/store/calendar.interfaces"
import { Provider } from "Renderer/models/external-providers/external-providers.interface"

const event1: CalendarEvent = {
  id: "test-event-1-0",
  name: "Felix's Birthday",
  startDate: "2021-01-01T10:00:00.000Z",
  endDate: "2021-01-01T13:00:00.000Z",
  description: "This is a description",
  provider: {
    type: Provider.Google,
    id: "test-event-1",
    calendarId: "example@mudita.com",
  },
}

const event2: CalendarEvent = {
  id: "test-event-3",
  name: "Felix's Birthday 3",
  startDate: "2022-02-03T10:00:00.000Z",
  endDate: "2022-02-03T13:00:00.000Z",
  provider: {
    type: Provider.Pure,
    id: "test-event-3",
  },
}

test("unique event ID is created properly", () => {
  expect(
    createEventUID({
      id: "event-id",
      name: "",
      startDate: "",
      endDate: "",
    })
  ).toBe("event-id")
  expect(
    createEventUID({
      id: "event-id",
      name: "",
      startDate: "",
      endDate: "",
      provider: {
        type: Provider.Google,
        id: "",
        calendarId: "",
      },
    })
  ).toBe("google_event-id")
  expect(
    createEventUID({
      id: "event-id",
      name: "",
      startDate: "",
      endDate: "",
      provider: {
        type: Provider.Google,
        id: "google-id",
        calendarId: "example@mudita.com",
      },
    })
  ).toBe("google_example@mudita.com_google-id")
})

test("events duplicates are found properly", () => {
  expect(findDuplicate([event1, event2], event1)).toBe(event1)
})

test("events duplicates are not found when there are none", () => {
  expect(findDuplicate([event1], event2)).toBeUndefined()
})

test("parsing simple description works properly", () => {
  expect(parseDescription("test description")).toStrictEqual({
    text: "test description",
    metadata: "",
  })
})

test("parsing description with separator works properly", () => {
  expect(
    parseDescription(`test description\n${descriptionSeparator}`)
  ).toStrictEqual({
    text: "test description",
    metadata: "",
  })
})

test("parsing description with metadata only works properly", () => {
  expect(
    parseDescription(`${descriptionSeparator}\ntest description`)
  ).toStrictEqual({
    text: "",
    metadata: "~~~~~~~~~~~~~~~~~~~~\ntest description",
  })
})

test("parsing full description works properly", () => {
  expect(
    parseDescription(
      `newest description${descriptionSeparator}\nold description${descriptionSeparator}\nolder description`
    )
  ).toStrictEqual({
    text: "newest description",
    metadata:
      "~~~~~~~~~~~~~~~~~~~~\nold description~~~~~~~~~~~~~~~~~~~~\nolder description",
  })
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
    .toBe(`[value] module.calendar.duplicatedEvent.name: Felix's Birthday 3
[value] module.calendar.duplicatedEvent.startDate: 2022-02-03T10:00:00.000Z
[value] module.calendar.duplicatedEvent.endDate: 2022-02-03T13:00:00.000Z
[value] module.calendar.duplicatedEvent.recurrence: every day for 10 times`)
})

test("exact duplicates are overwritten properly", () => {
  const newEvents = overwriteDuplicates({
    oldEvents: [event1, event2],
    newEvents: [event1],
  })
  expect(newEvents).toStrictEqual([event1, event2])
})

test("duplicates with slightly modified data are overwritten properly", () => {
  const updatedEvents = overwriteDuplicates({
    oldEvents: [event1, event2],
    newEvents: [
      {
        ...event1,
        name: "Felix's Birthday 2",
        startDate: "2022-01-01T10:00:00.000Z",
        endDate: "2022-01-01T13:00:00.000Z",
      },
    ],
  })
  expect(updatedEvents).toStrictEqual([
    {
      ...event1,
      name: "Felix's Birthday 2",
      startDate: "2022-01-01T10:00:00.000Z",
      endDate: "2022-01-01T13:00:00.000Z",
      description:
        "This is a description\n" +
        "~~~~~~~~~~~~~~~~~~~~\n" +
        "~~ [value] module.calendar.duplicatedEvent.updatedDescriptionTitle ~~\n" +
        "[value] module.calendar.duplicatedEvent.name: Felix's Birthday\n" +
        "[value] module.calendar.duplicatedEvent.startDate: 2021-01-01T10:00:00.000Z\n" +
        "[value] module.calendar.duplicatedEvent.endDate: 2021-01-01T13:00:00.000Z",
    },
    event2,
  ])
})

test("duplicates with data modified before are updated properly", () => {
  const updatedEvents = overwriteDuplicates({
    oldEvents: [
      {
        ...event1,
        name: "Felix's Birthday 2",
        startDate: "2022-01-01T10:00:00.000Z",
        endDate: "2022-01-01T13:00:00.000Z",
        description:
          "This is a new description\n" +
          "~~~~~~~~~~~~~~~~~~~~\n" +
          "~~ [value] module.calendar.duplicatedEvent.updatedDescriptionTitle ~~\n" +
          "[value] module.calendar.duplicatedEvent.name: Felix's Birthday\n" +
          "[value] module.calendar.duplicatedEvent.startDate: 2021-01-01T10:00:00.000Z\n" +
          "[value] module.calendar.duplicatedEvent.endDate: 2021-01-01T13:00:00.000Z\n" +
          "[value] module.calendar.duplicatedEvent.description: This is a description",
      },
    ],
    newEvents: [
      {
        ...event1,
        name: "Felix's Birthday 3",
        startDate: "2022-01-01T10:00:00.000Z",
        endDate: "2022-01-01T13:00:00.000Z",
        description: undefined,
      },
    ],
  })
  expect(updatedEvents).toStrictEqual([
    {
      ...event1,
      name: "Felix's Birthday 3",
      startDate: "2022-01-01T10:00:00.000Z",
      endDate: "2022-01-01T13:00:00.000Z",
      description:
        "This is a new description" +
        "\n~~~~~~~~~~~~~~~~~~~~\n" +
        "~~ [value] module.calendar.duplicatedEvent.updatedDescriptionTitle ~~\n" +
        "[value] module.calendar.duplicatedEvent.name: Felix's Birthday 2\n" +
        "[value] module.calendar.duplicatedEvent.description: This is a new description\n" +
        "~~~~~~~~~~~~~~~~~~~~\n" +
        "~~ [value] module.calendar.duplicatedEvent.updatedDescriptionTitle ~~\n" +
        "[value] module.calendar.duplicatedEvent.name: Felix's Birthday\n" +
        "[value] module.calendar.duplicatedEvent.startDate: 2021-01-01T10:00:00.000Z\n" +
        "[value] module.calendar.duplicatedEvent.endDate: 2021-01-01T13:00:00.000Z\n" +
        "[value] module.calendar.duplicatedEvent.description: This is a description",
    },
  ])
})

test("duplicates with removed description are updated properly", () => {
  const updatedEvents = overwriteDuplicates({
    oldEvents: [event1, event2],
    newEvents: [
      {
        ...event1,
        description: "",
      },
    ],
  })
  expect(updatedEvents).toStrictEqual([
    {
      ...event1,
      description:
        "~~~~~~~~~~~~~~~~~~~~\n" +
        "~~ [value] module.calendar.duplicatedEvent.updatedDescriptionTitle ~~\n" +
        "[value] module.calendar.duplicatedEvent.description: This is a description",
    },
    event2,
  ])
})
